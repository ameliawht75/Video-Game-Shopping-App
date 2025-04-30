import { useEffect, useState } from 'react';
import { CartItem, Game } from '../types';
import CartItemRow from './CartItemRow';

export default function CartList() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(false) //Loading indicator so user knows something is happening.
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true)
            try {
                const response = await fetch('http://localhost:3000/cart')
                if (!response.ok) {
                    setErrorMessage(response.statusText)
                } else {
                    const data = await response.json()
                    setCartItems(data)
                }
            } catch (error: any) {
                setErrorMessage(error.message)
            }
            setLoading(false)
        }
        fetchCart()

        const fetchGames = async () => {
            setLoading(true)
            try {
              const response = await fetch('http://localhost:3000/games')
              if (!response.ok) {
                setErrorMessage("There was an error fetching the data: " + response.statusText)
              } else {
                const data = await response.json()
                setGames(data)
                setErrorMessage("") //clear the error if we get data
              }
            } catch (error: any) { //tells typescript not to worry about the type of error
              setErrorMessage("There was an error fetching the data: " + error.message)
            }
            setLoading(false)
          }
          fetchGames()
    }, [])
    return (
        <>
        <h2 className="display-5 mb-4">Cart</h2>
            {loading ? <p className="text-body-tertiary">Loading...</p> :
                errorMessage ? <p className="text-danger">{errorMessage}</p> :
                    <table className="table table-striped">
                        <tbody>
                            {cartItems.map(item => (
                                <CartItemRow
                                    key={item.id}
                                    item={item}
                                    games={games}
                                />
                            ))}
                        </tbody>
                    </table>
            }
        </>
    )
}