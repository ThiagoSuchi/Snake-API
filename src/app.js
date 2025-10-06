import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import scoreRoutes from "./routes/scoreRoutes.js"; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB conectado"))
.catch(err => console.error("Erro ao conectar no MongoDB:", err));

app.use("/", scoreRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

export default app;
