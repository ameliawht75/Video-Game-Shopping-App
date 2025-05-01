import express from "express";
import { getGames, addGame } from "../controllers/gamesController";

const router = express.Router();

// GET all games
router.get("/", getGames);

// POST a new game
router.post("/", addGame);

export default router;