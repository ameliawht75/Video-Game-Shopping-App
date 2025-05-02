import { useEffect, useState } from "react";
import { CartItem, Game } from "../types";
import CartItemRow from "./CartItemRow";

export default function CartList() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch cart and games data
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/cart");
        if (!response.ok) {
          setErrorMessage(response.statusText);
        } else {
          const data = await response.json();
          setCartItems(data);
        }
      } catch (error: any) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchCart();

    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/games");
        if (!response.ok) {
          setErrorMessage(
            "There was an error fetching the data: " + response.statusText
          );
        } else {
          const data = await response.json();
          setGames(data);
          setErrorMessage(""); // Clear the error if we get data
        }
      } catch (error: any) {
        setErrorMessage(
          "There was an error fetching the data: " + error.message
        );
      }
      setLoading(false);
    };
    fetchGames();
  }, []);

  // Handle item deletion
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      // Remove the item from the cartItems state
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const game = games.find((game) => game.id === item.gameId);
    return total + (game ? game.price * item.amount : 0);
  }, 0);

  return (
    <>
      <h2 className="display-5 mb-4">Cart</h2>
      {loading ? (
        <p className="text-body-tertiary">Loading...</p>
      ) : errorMessage ? (
        <p className="text-danger">{errorMessage}</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Game</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  games={games}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
          <h3 className="mt-4">Total Price: ${totalPrice.toFixed(2)}</h3>
        </>
      )}
    </>
  );
}