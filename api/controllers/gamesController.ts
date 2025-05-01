import { Request, Response } from "express";

let games = [
  { id: 1, title: "The Legend of Zelda", genre: "Adventure", price: 59.99 },
  { id: 2, title: "Super Mario Bros", genre: "Platformer", price: 49.99 },
];

// Get all games
export const getGames = (req: Request, res: Response) => {
  res.json(games);
};

// Add a new game
export const addGame = (req: Request, res: Response) => {
  const newGame = { id: games.length + 1, ...req.body };
  games.push(newGame);
  res.status(201).json(newGame);
};