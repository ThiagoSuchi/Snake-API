import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import scoreRoutes from "./routes/scoreRoutes.js";
import connectDB from "./config/DbConnect.js";

const app = express();

dotenv.config();

app.use(cors({
  origin: ["http://localhost:3000", "https://seu-dominio-vercel.app"], 
}));
app.use(express.json());

connectDB();

app.use("/", scoreRoutes);

app.get("/teste", (req, res) => {
  res.json({ message: "API funcionando!" });
});

export default app;
