import express from "express";
import Jogador from "../models/jogador.js";

const router = express.Router();


router.get("/jogadores", async (req, res) => {
  try {
    const jogadores = await Jogador.find({}, 'name password _id');
    res.json(jogadores);
  } catch (err) {
    console.error("Erro ao buscar jogadores:", err);
    res.status(500).json({ error: "Erro no servidor", details: err.message });
  }
});

router.post("/jogadores", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "Nome e senha obrigatórios" });
  }

  if (name.length < 3) {
    return res.status(400).json({ error: "Nome deve ter pelo menos 3 caracteres" });
  }

  if (password.length < 4 || password.length > 20) {
    return res.status(400).json({ error: "Senha deve ter entre 4 e 20 caracteres" });
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  if (!hasLetter || !hasNumber) {
    return res.status(400).json({ error: "Senha deve conter pelo menos uma letra e um número" });
  }

  try {
    // Check if name already exists (case insensitive)
    const existing = await Jogador.findOne({ name: new RegExp(`^${name.trim()}$`, 'i') });
    if (existing) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const jogador = await Jogador.create({ name: name.trim(), password, score: 0 });
    return res.status(201).json({ jogador });
  } catch (err) {
    console.error("Erro criando jogador:", err);
    if (err.code === 11000) { // Duplicate key error
      res.status(400).json({ error: "Usuário já existe" });
    } else {
      res.status(500).json({ error: "Erro no servidor", details: err.message });
    }
  }
});

router.put("/jogadores/:id/score", async (req, res) => {
  const { id } = req.params;
  let { score } = req.body;

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

      
      console.log(` ${jogador.name} acabou de marcar ${score} pontos!`);
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
