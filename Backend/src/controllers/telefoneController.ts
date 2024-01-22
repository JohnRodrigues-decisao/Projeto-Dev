import { Request, Response } from "express";
import { TelefoneInterface } from "../interfaces/telefoneInterface";
import { deleteTell, desabilitarIsPrincipalService, getOneTell, getTelelefone, getTell, postTell, putTell } from "../services/telefoneService";

// Criar um telefone 
export async function createTell(req: Request, res: Response) {
    try {   
        const { numero, is_principal, id_pessoa } = req.body;

        const telefone: TelefoneInterface = {
            numero: numero,
            is_principal: is_principal,
            id_pessoa: id_pessoa
        }

        const newTell = await postTell(telefone);
        return res.json(newTell);
    } catch (error) {
        return res.json(`Error ao criar: ${error}`);
    }   
}

// Listar todos os telefones
export async function listTell(_, res: Response) {
    try {
        const telefone = await getTell();
        return res.json(telefone);
    } catch (error) {
        return res.json(`error: ${error}`);
    }
} 

// Listar um telefone
export async function ListOneTell(req: Request, res: Response) {
    const { id_telefone } = req.params;

    const findTell = await getOneTell(id_telefone);
    if(findTell){
        return res.json(findTell);
    } else {
        return res.json({ msg: "Pessoa não encontrado, operação não realizada!💃" });
    }
}

// Listar um telefone por id_telefone
export async function listOneEndereco(req: Request, res: Response) {
  const { id_telefone } = req.params;

  const findTelefone = await getTelelefone(id_telefone);

  if(findTelefone){
    return res.json(findTelefone);
  } else {
    return res.json({ msg: "Essa pessoa não possui endereços cadastrados" });
  }
}

// Controller para editar um Telefone
export async function editTell(req: Request, res: Response) {
    try {
      const { id_telefone } = req.params;
      const { numero, is_principal, id_pessoa } = req.body;
  
      const newValueTell = await putTell(
        id_telefone,
        numero, 
        is_principal, 
        id_pessoa
      );
  
      if (newValueTell[0] === 1) {
        return res.json({ msg: "Telefone alterado com sucesso!👌" });
      } else {
        return res.json({
          msg: "Telefone não encontrado, operação não realizada!💃",
        });
      }
    } catch (error) { 
      return res.json(`Erro ao realizar a requisição`);
    }
} 

// Controller para excluir uma pessoa
export async function destroyTell(req: Request, res: Response){
    try{
      
          const { id_telefone } = req.params;

          const delTell = await deleteTell(id_telefone);

          if (delTell) {
            return res.json({ msg: "Pessoa deletada com sucesso!👌" });
          } else {
            return res.json({
              msg: "Pessoa não encontrado, operação não realizada!💃"
            });
          }
          
    } catch(error){
          return res.json('Error ao realizar a requisição.')
    }
}

// Controller para desabilitar todos os is_principal pelo id_pessoa
export async function desabilitarIsPrincipal(req: Request, res: Response): Promise<void> {
  const { id_pessoa } = req.params;

  try {
    await desabilitarIsPrincipalService(id_pessoa);

    res.status(200).json({ message: `Registro ${id_pessoa} atualizado com sucesso.` });
  } catch (error) {
    res.status(500).json({ error: `Erro interno do servidor: ${error.message}` });
  }
} 