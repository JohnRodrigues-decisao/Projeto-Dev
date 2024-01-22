import { Router } from "express";
import { createEndereco, listAllEnderecos, destroyEndereco, listEndereco, desabilitarIsPrincipal, editEndereco, listOneEndereco } from "../controllers/enderecoController";

const router = Router();

// Rota para Listar todos os endereço
router.get("/", listAllEnderecos);

// Rota para Listar um endereço
router.get("/:id_pessoa", listEndereco);

// Rota para Listar um endereço pelo id_endereco
router.get("/find/:id_endereco", listOneEndereco);

// Rota para criar um endereço
router.post("/", createEndereco);
 
// Rota para editar um endereço
router.put("/:id_endereco", editEndereco);

// Rota para deletar um endereço
router.delete("/:id_endereco", destroyEndereco);

// Rota para desabilitar todos os is_principal pelo id_pessoa
router.put("/isprincipal/:id_pessoa", desabilitarIsPrincipal)
 
export { router };
