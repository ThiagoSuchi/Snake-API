import mongoose from "mongoose";

const jogadorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 },
}, {
  collection: 'jogadores' // Força o nome correto da coleção
});

export default mongoose.model("Jogador", jogadorSchema);

