import { Request, Response } from "express";

import { deleteRepres, getOneRepres, getRepres, postRepres, putRepres } from "../services/representanteService";
import { representanteInterface } from "../interfaces/representanteInterface";


// Controller para listar todos os representantes
export async function listAllRepres(_, res: Response) {
      try {
            const representante = await getRepres();
            return res.json(representante);
      } catch (error) {
            return res.json(`error: ${error}`); 
      }
}
 
// Controller para listar um ou mais representantes pelo id_pessoa
export async function listOneRepress(req: Request, res: Response) {
      const { id_pessoa } = req.params;

      const findeRepress = await getOneRepres(id_pessoa);

      if(findeRepress){
        return res.json(findeRepress);
      } else {
        return res.json({ msg: "Essa pessoa não possui representantes cadastrados" });
      }
}

// Controller para criar o representante
export async function createRepress(req: Request, res: Response) {
      try {
            const {id_pessoa, nome,identificacao } = req.body;

            const representante: representanteInterface = {
                  id_pessoa: id_pessoa,
                  nome: nome,
                  identificacao: identificacao
                  
            };

            const newRepresentante = await postRepres(representante);

            return res.json(newRepresentante.id_pessoa);

      } catch (error) {
            return res.json(`Error ao criar um representante: ${error}`);
      }
}

// Controller para editar um representante
export async function editRepress(req: Request, res: Response) {
      try {
            const { id_representante } = req.params;
            const { nome, identificacao, id_pessoa } = req.body;

            const newValueRepress = await putRepres(
                  id_representante,
                  nome, 
                  identificacao,
                  id_pessoa
            );

            if (newValueRepress[0] === 1) {
              return res.json({ msg: "Representante alterado com sucesso!👌" });
            } else {
              return res.json({
                msg: "Representante não encontrado, operação não realizada!💃",
              });
            }

      } catch (error) {
            return res.json(`Erro ao realizar a requisição`);

      }
}

// Controller para excluir um representante
export async function destroyRepress(req: Request, res: Response) {
      try {
            const { id_representante } = req.params;
            const deletRepress = await deleteRepres(id_representante);

            
            if (deletRepress) {
              return res.json({ msg: "Representante deletado com sucesso!👌" });
            } else {
              return res.json({
                msg: "Representante não encontrado, operação não realizada!💃",
              });
            }

      } catch (error) {
            return res.json("Error ao realizar a requisição.");

      }
}    