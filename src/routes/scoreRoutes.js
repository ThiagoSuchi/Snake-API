import express from "express";
import Jogador from "../models/jogador.js";

const router = express.Router();


router.post("/jogadores", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "Nome e senha obrigatórios" });
  }

  try {
    
    let jogador = await Jogador.findOne({ name, password });

    if (jogador) {
      
      return res.json({ message: "Login realizado", jogador });
    } else {
      
      jogador = await Jogador.create({ name, password, score: 0 });
      return res.status(201).json({ message: "Cadastro realizado", jogador });
    }
  } catch (err) {
  console.error("Erro criando jogador:", err); 
  res.status(500).json({ error: "Erro no servidor", details: err.message });
}

});


router.put("/jogadores/:id/score", async (req, res) => {
  const { id } = req.params;
  let { score } = req.body;

  console.log("Score recebido:", score, "Tipo:", typeof score);

  try {
    const jogador = await Jogador.findById(id);
    if (!jogador) {
      return res.status(404).json({ error: "Jogador não encontrado" });
    }

    
    score = Number(score);
    if (isNaN(score)) {
      return res.status(400).json({ error: "Score inválido" });
    }

    
    if (score > jogador.score) {
      jogador.score = score;
      await jogador.save();
    }

    
    const ranking = await Jogador.find().sort({ score: -1 }).limit(10);

    res.json({ message: "Score atualizado", jogador, ranking });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", details: err.message });
  }
});


router.get("/ranking", async (req, res) => {
  try {
    const ranking = await Jogador.find().sort({ score: -1 }).limit(10);
    res.json(ranking);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar ranking", details: err.message });
  }
});

export default router;
