export type CartItem = {
    id: number
    gameId: number
    amount: number
}

export type Game = {
    id: number
    title: string
    genre: string
    platform: string
    releastYear: number
    developer: string
    price: number
  }