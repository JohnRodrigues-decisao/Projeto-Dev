import { Request, Response } from "express";
import { PessoaInterface } from "../interfaces/pessoaInterface";

import { deletePessoa, getIdentificacao, getPessoa, getPessoaDetails, getPessoas, postPessoa, putPessoa } from "../services/pessoaService";

// Controller para criar uma pessoa
export async function createPessoa(req: Request, res: Response) {
 
      try { 
            const { nome, identificacao, nome_fantasia, nome_mae, inscricao_municipal, inscricao_estadual } = req.body;

            const existePessoa = await getPessoaDetails({ nome, nome_fantasia, nome_mae, inscricao_municipal, inscricao_estadual });

            if (existePessoa) {
              return res.status(400).json({ msg: 'Pessoa duplicada, não é possível cadastrar.' });
            }

            const identificacaoPessoa = await getIdentificacao({ identificacao });
            
            if (identificacaoPessoa) {
              return res.status(400).json({ msg: 'O CNPJ/CPF já está cadastrado.' });
            }

            const pessoa: PessoaInterface = {
                  nome: nome,
                  identificacao: identificacao,
                  nome_fantasia: nome_fantasia,
                  nome_mae: nome_mae,
                  inscricao_municipal: inscricao_municipal,
                  inscricao_estadual: inscricao_estadual     
            } 

            const newPessoa = await postPessoa(pessoa);            
            return res.json(newPessoa.id_pessoa);

      } catch (error) { 
            return res.json(`Error ao criar: ${error}`);
      }
}

export async function listPessoas(_, res: Response) {
      try {
            const pessoas = await getPessoas();
            console.log('era para retornar pessoas');
            return res.json(pessoas);
      } catch (error) {
            return res.json(`error: ${error}`);
      }
}

// Controller para listar uma pessoa
export async function listPessoa(req: Request, res: Response) {
  const { id_pessoa } = req.params;

  const findPessoa = await getPessoa(id_pessoa);

  if(findPessoa){
    return res.json(findPessoa);
  } else {
    return res.json({ msg: "Pessoa não encontrado, operação não realizada!💃" });
  }

}

// Controller para editar uma pessoa
export async function editPessoa(req: Request, res: Response) {
  try {
    const { id_pessoa } = req.params;

    const { nome, identificacao, nome_fantasia, nome_mae, inscricao_municipal, inscricao_estadual } = req.body;

    const newValuePessoa = await putPessoa(
      id_pessoa,
      nome,
      identificacao,
      nome_fantasia,
      nome_mae,
      inscricao_municipal,
      inscricao_estadual
    );

    if (newValuePessoa[0] === 1) {
      return res.json({ msg: "Pessoa alterado com sucesso!👌" });
    } else {
      return res.json({
        msg: "Pessoa não encontrado, operação não realizada!💃",
      });
    }
  } catch (error) { 
    return res.json(`Erro ao realizar a requisição`);
  }
}  

// Controller para excluir uma pessoa
export async function destroyPessoa(req: Request, res: Response){
      try{
        
            const { id_pessoa } = req.params;

            const delPessoa = await deletePessoa(id_pessoa);

            if (delPessoa) {
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