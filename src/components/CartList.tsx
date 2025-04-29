import { useEffect, useState } from 'react';
import { CartItem, Game } from '../types';
import CartItemRow from './CartItemRow';

type Props = {
    cartItems: CartItem[],
    setCartItems: (newValue: CartItem[]) => void
    games: Game[]
}
export default function CartList({ cartItems, setCartItems, games }: Props) {
    const [loading, setLoading] = useState(false) //Loading indicator so user knows something is happening.
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const asyncFunction = async () => {
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
        asyncFunction()
    }, [])
    return (
        <>
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