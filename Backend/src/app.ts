// Importação das variáveis de ambiente 
import 'dotenv/config';
// Importação da base de dados
import './database/connection'
// Importação das dependncias^principais 
import express from "express";
import cors from "cors";

// Importação das rotas
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
 
export { app };