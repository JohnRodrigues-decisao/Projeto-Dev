import { Router } from "express";
import { PessoaCliente, createPessoa, destroyPessoa, /* destroyPessoa, */ editPessoa, listPessoa, listPessoas } from "../controllers/pessoaController";

const router = Router();

// Rota para Listar todas as pessoa
router.get("/", listPessoas);

// Rota para Listar todas as pessoa
router.get("/pessoa-cliente", PessoaCliente);

// Rota para Listar uma pessoa
router.get("/:id_pessoa", listPessoa);

// Rota para criar  uma pessoa
router.post("/", createPessoa);

// Rota para editar  uma pessoa
router.put("/:id_pessoa", editPessoa);

// Rota para deletar  uma pessoa
router.delete("/:id_pessoa", destroyPessoa);


export { router };