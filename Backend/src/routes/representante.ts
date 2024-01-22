import { Router } from "express";
import { createRepress, destroyRepress, editRepress, listAllRepres, listOneRepress } from "../controllers/representanteController";

const router = Router();

// Rota para Listar todas os representantes
router.get("/", listAllRepres);

// Rota para Listar um representantes pelo id_pessoa
router.get("/:id_pessoa", listOneRepress);

// Rota para criar um representantes
router.post("/", createRepress);

// Rota para editar um representantes 
router.put("/:id_representante", editRepress);

// Rota para deletar um representante
router.delete("/:id_representante", destroyRepress);

export { router };