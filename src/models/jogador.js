import mongoose from "mongoose";

const jogadorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 },
});

export default mongoose.model("Jogador", jogadorSchema);

