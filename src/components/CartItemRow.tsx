import type { CartItem, Game } from "../types";

type Props = {
  item: CartItem;
  games: Game[];
  handleDelete: (id: number) => void; // Delete item from cart
};

export default function CartItemRow({ item, games, handleDelete }: Props) {
  const game = games.find((game) => game.id === item.gameId);
  return (
    <tr>
      <td>{game?.title || "Game Not Found"}</td>
      <td>${game?.price.toFixed(2)}</td>
      <td>{item.amount}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(item.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
