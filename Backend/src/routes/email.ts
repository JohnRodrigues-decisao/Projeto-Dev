import { Router } from "express";
import { createEmail, destroyEmail, editEmail, listEmail, listEmailPrId, listEmailsPessoa } from "../controllers/emailController";

const router = Router();

// Rota para criar um email
router.post("/", createEmail);

// Rota pra listar os emails
router.get("/", listEmail);

// Rota pra listar os emails com o id_pessoa
router.get("/:id_pessoa", listEmailsPessoa);

// Rota pra listar os emails com o id_email
router.get("/list/:id_email", listEmailPrId);

// Rota para editar o email
router.put("/:id_email", editEmail);

// Rota para excluir o email
router.delete("/:id_email", destroyEmail);

export { router };       