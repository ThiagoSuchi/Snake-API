import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import scoreRoutes from "./routes/scoreRoutes.js"; 
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/DbConnect.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerDocument = YAML.load(join(__dirname, "..", "swagger.yaml"));

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

connectDB();

app.use("/", scoreRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

export default app;
