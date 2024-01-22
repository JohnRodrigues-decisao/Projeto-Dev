import { Router } from "express";
import { createConta, editConta, listConta, loginConta } from "../controllers/contaController";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// Criar conta
router.post("/", createConta);

// Realizar login
router.post("/login", loginConta); 

// Editar conta
router.put("/edit-login/:id_conta", editConta);

// listar user
router.get("/edit-login/:id_conta", listConta);


export { router };
    