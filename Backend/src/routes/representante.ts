import { Router } from "express";
import { createRepress, destroyRepress, editRepress, listAllRepress, listOneRepress, listPesoasRepress } from "../controllers/representanteController";

const router = Router();


// Listar todos os respresentantes pelo id_pessoa
router.get("/:id_pessoa", listAllRepress);

// Rota para criar um representantes
router.post("/", createRepress);

// Rota para deletar um representante
router.delete("/:id_representante", destroyRepress);

// Rota para editar um representantes 
router.put("/:id_representante", editRepress);

// Rota para pegar dados do representatne pelo id_representatante
router.get("/edit/:id_representante", listOneRepress);

export { router };      