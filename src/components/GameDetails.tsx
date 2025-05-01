import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Game } from "../types"

export default function GameDetails() {
    const {gameId} = useParams()
    const [game, setGame] = useState<null | Game>(null) //Game details state

    useEffect(() => {
        const fetchGame = async () => {
            const response = await fetch('http://localhost:3000/games/' + gameId)
            const data = await response.json()
            setGame(data)
        }
        fetchGame()
    })

    if(!game) {
        return (<div>Loading...</div>)
    }

    return (
        <div>
            <h2 className="display-5 mb-4">{game.title}</h2>
            <p className="card-text">{game.genre}</p>
        </div>
    )
}