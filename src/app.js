import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import scoreRoutes from "./routes/scoreRoutes.js"; 

const app = express();


app.use(cors({
  origin: "http://localhost:3000", 
}));
app.use(express.json()); 


mongoose.connect(
"mongodb+srv://joaosports19_db_user:k8qnAoyD2xDOBLLj@cluster0.xp29en9.mongodb.net/"
)
.then(() => console.log("MongoDB conectado"))
.catch(err => console.error("Erro ao conectar no MongoDB:", err));


app.use("/", scoreRoutes);


app.get("/teste", (req, res) => {
  res.json({ message: "API funcionando!" });
});

export default app;
