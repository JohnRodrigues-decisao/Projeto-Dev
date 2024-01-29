import { Request, Response } from "express";
import { representanteInterface } from "../interfaces/representanteInterface";
import { deleteRepres, getAllRepres, getOneRepres, getPessoaRepres, postRepres, putRepres } from "../services/representanteService";

// Listar todos os representantes
export async function listAllRepress(req: Request, res: Response) {
    try {
        const { id_pessoa } = req.params;
  
        const findRepress = await getAllRepres(id_pessoa);
  
        if(findRepress){
          return res.json(findRepress);
        } else {
          return res.json({ msg: "Essa pessoa não possui representantes cadastrados" });
        }
      } catch (error) { 
        return res.json("Error ao realizar a requisição.");
      } 
}   

// Criar representates
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

// Controller para pegar dados do representatne pelo id_representatante
export async function listOneRepress(req: Request, res: Response) {
  try {
    const { id_representante } = req.params;

    const findRepress = await getOneRepres(id_representante);

    if(findRepress){
      return res.json(findRepress);
    } else {
      return res.json({ msg: "Essa pessoa não possui representantes cadastrados" });
    }
  } catch (error) {
    return res.json("Error ao realizar a requisição.");
  }
}  

// Controller listar representantes com id_pessoa
export async function listPesoasRepress(req: Request, res: Response) {
  try {
    const { id_pessoa } = req.params;
 
    const findPessoaRepress = await getPessoaRepres(id_pessoa);

    if(findPessoaRepress){
      return res.json(findPessoaRepress);
    } else {
      return res.json({ msg: "Essa pessoa não possui representantes cadastrados" });
    }
  } catch (error) {
    return res.json({ msg: "Error ao realizar a requisição." });
  }
} 