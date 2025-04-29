import type { CartItem, Game } from "../types"

type Props = {
    item: CartItem
    games: Game[] 
}
    export default function CartItemRow({ item, games }: Props){
        const game = games.find(game => game.id === item.gameId)
        return (
            <tr>
            <td>{game?.title || "Game Not Found"}</td>
            <td>${game?.price.toFixed(2)}</td>
            <td>{item.amount}</td>
        </tr>
        )
    }
