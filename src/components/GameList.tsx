import { useEffect } from "react"
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


        //after the first render, we want to go and get the data, 
          // then render again with the data
          useEffect(() => {
            const asyncFunction = async () => {
            const response = await fetch ('http://localhost:3000/games')
            const data = await response.json()
            setGames(data)
            }
            asyncFunction()
          }, []) //run once after the first render and twice in dev mode
        

        const addToCart = async (gameId: number) => {
            const newCartItem = {
              gameId: gameId, 
              amount: 1
            }
            //make the change on the backend
            const response = await fetch('http://localhost:3000/cart', {
              method: 'POST',
              body: JSON.stringify(newCartItem),
              headers: {
                "Content-Type": "application/json",
              },
            })
            const newlyCreatedItem = await response.json() //this will have an id on it 
            //make the change on the front end
            setCartItems([...cartItems, newlyCreatedItem])
          }
        return (
            <div className="d-flex flex-wrap gap-3">
            {games.map(game => (
              <div key={game.id} className="card flex-grow-1">
                <h3 className="card-title">{game.title}</h3>
                <p className="card-text">{game.genre}</p>
                <button className="btn btn-primary" 
                onClick={() => addToCart(game.id)}
                >
                  ${game.price.toFixed(2)}
                  </button>
              </div>
            ))}
            </div>
        )
    }