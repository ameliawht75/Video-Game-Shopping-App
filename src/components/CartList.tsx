import { useEffect } from 'react';
import { CartItem, Game } from '../types';
import CartItemRow from './CartItemRow';

type Props = {
    cartItems: CartItem[],
    setCartItems: (newValue: CartItem[]) => void
    games: Game[]
}
export default function CartList({ cartItems, setCartItems, games }: Props) {
    useEffect(() => {
        const asyncFunction = async () => {
            const response = await fetch('http://localhost:3000/cart')
            const data = await response.json()
            setCartItems(data)
        }
        asyncFunction()
    }, [])
    return (
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
    )
}