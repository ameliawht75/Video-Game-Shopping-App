import { useState } from "react";
import CartList from './components/CartList';
import GameList from './components/GameList';
import type { CartItem, Game } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [games, setGames] = useState<Game[]>([])

  return (
    <div className="container mt-3">
      <h2 className="display-5 mb-4">Cart</h2>
      <CartList
        cartItems={cartItems}
        setCartItems={setCartItems}
        games={games}
      />
      <h2 className="display-5 mb-4">Check Out Our Games!</h2>
      <GameList
        cartItems={cartItems}
        setCartItems={setCartItems}
        games={games}
        setGames={setGames}
      />
    </div>
  )
}
