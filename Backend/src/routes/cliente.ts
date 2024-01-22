import { Router } from "express";
import { createClient, listarClient, editClient, destroyClient, listarClients, listarClientPessoa } from "../controllers/clienteController";

const router = Router();

// Rota para a criação da data de um cliente
router.post("/", createClient);

// Rota para listar todos is clientes
router.get("/", listarClients);

// Rota para listar um cliente com id pessoa
router.get("/:id_pessoa", listarClientPessoa);

// Rota para listar um cliente
router.get("/:id_cliente", listarClient);

// Rota para editar a data de um cliente
router.put("/:id_cliente", editClient);

// Rota para excluir a data de um cliente
router.delete("/:id_pessoa", destroyClient);

export { router };