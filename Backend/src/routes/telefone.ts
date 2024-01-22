import { Router } from "express";
import { ListOneTell, createTell, desabilitarIsPrincipal, destroyTell, editTell, listOneEndereco, listTell } from "../controllers/telefoneController";

// Importação dos controllers


const router = Router();

// Rota para Listar todas os telefones
router.get("/", listTell);

// Rota para Listar um telefone pelo id
router.get("/:id_telefone", ListOneTell);

// Rota listar dados do telefone pelo id_telefone
router.get("/list/:id_telefone", listOneEndereco)

// Rota para criar um telefone
router.post("/", createTell);

// Rota para editar um telefone 
router.put("/:id_telefone", editTell);

// Rota para deletar um telefone
router.delete("/:id_telefone", destroyTell);

// Rota para desabilitar todos os is_principal pelo id_pessoa
router.put("/isprincipal/:id_pessoa", desabilitarIsPrincipal)


export { router }; 