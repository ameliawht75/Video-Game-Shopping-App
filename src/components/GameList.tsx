import { useEffect, useState } from "react"
import type { CartItem, Game } from '../types'

type Props = {
  cartItems: CartItem[],
  setCartItems: (newValue: CartItem[]) => void
  games: Game[],
  setGames: (newValue: Game[]) => void
}

export default function GameList({
  setCartItems, cartItems, games, setGames
}: Props) {
  const [isLoading, setIsLoading] = useState(false) //Loading indicator
  const [isAddingToCart, setIsAddingToCart] = useState(false) //Loading indicator for adding to cart
  const [error, setError] = useState<null | string>(null) //Error handling


  //after the first render, we want to go and get the data, 
  // then render again with the data
  useEffect(() => {
    const asyncFunction = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:3000/games')
        if (!response.ok) {
          setError("There was an error fetching the data: " + response.statusText)
        } else {
          const data = await response.json()
          setGames(data)
          setError(null) //clear the error if we get data
        }
      } catch (error: any) { //tells typescript not to worry about the type of error
        setError("There was an error fetching the data: " + error.message)
      }
      setIsLoading(false)
    }
    asyncFunction()
  }, []) //run once after the first render and twice in dev mode


  const addToCart = async (gameId: number) => {
    const newCartItem = {
      gameId: gameId,
      amount: 1
    }
    //make the change on the backend
    setIsAddingToCart(true)
    try {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'POST',
        body: JSON.stringify(newCartItem),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        setError("There was an error adding the item to the cart: " + response.statusText)
      } else {
      const newlyCreatedItem = await response.json() //this will have an id on it 
      //make the change on the front end
      setCartItems([...cartItems, newlyCreatedItem])
      }
    } catch (error: any) {
      setError("There was an error adding the item to the cart: " + error.message)
    }
    setIsAddingToCart(false)
  }
  return (
    <div className="d-flex flex-wrap gap-3">
      {isLoading && <p className="text-body-tertiary">Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!isLoading && !error && games.length === 0 && <p className="text-body-tertiary">No games found</p>}
      {!isLoading && !error && games.length > 0 && <h2 className="display-5 mb-4">Check Out Our Games!</h2>}
      {games.map(game => (
        <div key={game.id} className="card flex-grow-1">
          <h3 className="card-title">{game.title}</h3>
          <p className="card-text">{game.genre}</p>
          <button className="btn btn-primary"
          disabled={isAddingToCart}
            onClick={() => addToCart(game.id)}
          >
            {isAddingToCart ? "Adding..." : "$" + game.price.toFixed(2)}
          </button>
        </div>
      ))}
    </div>
  )
}