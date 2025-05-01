import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import gamesRoutes from "./routes/gamesRoutes";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/games", gamesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
});