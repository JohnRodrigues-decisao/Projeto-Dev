import { Request, Response } from "express";
import { PessoaInterface } from "../interfaces/pessoaInterface";

import { deletePessoa, getIdentificacao, getPessoa, getPessoaCliente, getPessoaDetails, getPessoas, postPessoa, putPessoa } from "../services/pessoaService";
import { representanteModel } from "../models/representanteModel";
import { PessoaModel } from "../models/pessoaModel";
import { getAllRepres } from "../services/representanteService";
// import { getOneRepres } from "../services/representanteService";
/* import { listOneRepress } from "./representanteController";*/

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

// Controller para listar uma pessoa
export async function listPessoas(_, res: Response) {
      try {
            const pessoas = await getPessoas();
            console.log('era para retornar pessoas');
            return res.json(pessoas);
      } catch (error) {
            return res.json(`error: ${error}`);
      }
} 

// Controller para listar uma pessoa por id_pessoa
export async function listPessoa(req: Request, res: Response) {
  try {
    const { id_pessoa } = req.params;

    const findPessoa = await getPessoa(id_pessoa);

    if(findPessoa){
      return res.json(findPessoa);
    } else {
      return res.json({ msg: "Pessoa não encontrado, operação não realizada!💃" });
    }
  } catch (error) {
    return res.json(`error: ${error}`);
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

// Controller para listar pessoas e clientes atrelados
export async function PessoaCliente(req: Request, res: Response) {
  try {
    const combineTables = await getPessoaCliente();

    if (combineTables.length > 0) { 
      return res.status(200).json(combineTables);
    } else {
      return res.status(404).json({
        error: "Nenhum registro de Pessoa e Cliente encontrado.",
      });
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    res.status(500).json({ error: 'Erro ao realizar a requisição', details: error.message });
  }
}

// Controller para excluir uma pessoa
export async function destroyPessoa(req: Request, res: Response){
  try {
    const { id_pessoa } = req.params;

    // const findRepress = await getAllRepres(id_pessoa);

    // if(findRepress){
    //   return res.json({ msg: "Essa pessoa não pode ser excluida, pois existe representantes cadastrados."});
    // } else {
      
      const pessoa = await PessoaModel.destroy({ where: { id_pessoa } });
   
      if (pessoa) {
        return { success: true, message: 'Pessoa deletada com sucesso' };
      } else {
        return { success: false, message: 'Falha ao deletar a pessoa' };
      } 
    // }
    
  } catch (error) {
    console.error('Erro ao deletar pessoa:', error);
    return { success: false, message: 'Erro ao deletar a pessoa' };
  }
} 

