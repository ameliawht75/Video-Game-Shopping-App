import { useState } from "react"
import type { Game } from '../types'
import { useLoaderData, Link } from "react-router-dom"

export const gamesListLoader = async () => {
  try {
    const response = await fetch('http://localhost:3000/games');
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to load games:", error);
    return [];
  }
};

export default function GameList() {
    const games = useLoaderData() as Game[]
    const [isLoading] = useState(true) //Loading indicator for the games list
    const [isAddingToCart, setIsAddingToCart] = useState(false) //Loading indicator for adding to cart
    const [error, setError] = useState<null | string>(null) //Error handling


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
        }
      } catch (error: any) {
        setError("There was an error adding the item to the cart: " + error.message)
      }
      setIsAddingToCart(false)
    }
    return (
      <>
        <h2 className="display-5 mb-4">Check Out Our Games!</h2>
        <div className="d-flex flex-wrap gap-3">
          {error && <p className="text-danger">{error}</p>}
          {!isLoading && !error && games.length === 0 && <p className="text-body-tertiary">No games found</p>}
          {!isLoading && !error && games.length > 0 && <h2 className="display-5 mb-4">Check Out Our Games!</h2>}
          {games.map(game => (
            <div key={game.id} className="card flex-grow-1">
              <h3 className="card-title">{game.title}</h3>
              <p className="card-text">{game.genre}</p>
              <p><Link to={"/games/" + game.id} className="btn btn-secondary mb-2">Details</Link></p>
              <button className="btn btn-primary"
                disabled={isAddingToCart}
                onClick={() => addToCart(game.id)}
              >
                {isAddingToCart ? "Adding..." : "$" + game.price.toFixed(2)}
              </button>
            </div>
          ))}
        </div>
      </>
    )
}
