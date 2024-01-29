import { v4 } from "uuid";

import { PessoaInterface } from "../interfaces/pessoaInterface";

import { PessoaModel } from "../models/pessoaModel";
import { ClienteModel } from "../models/clienteModel";

// Serviço para criar pessoas
export async function postPessoa( pessoa: PessoaInterface ): Promise<PessoaInterface> {
  return await PessoaModel.create({
    id_pessoa: v4(),
    nome: pessoa.nome,
    identificacao: pessoa.identificacao,
    nome_fantasia: pessoa.nome_fantasia,
    nome_mae: pessoa.nome_mae,
    inscricao_municipal: pessoa.inscricao_municipal, 
    inscricao_estadual: pessoa.inscricao_estadual,
  });
}

// Serviço para listar pessoas
export async function getPessoas() {
  return await PessoaModel.findAll();
}
 
// Serviço para listar uma pessoa
export async function getPessoa(id_pessoa: string) {
  return await PessoaModel.findOne({ where: { id_pessoa } })
}

// Serviço para editar a pessoa
export async function putPessoa(
  id_pessoa: string, 
  nome: string,
  identificacao: string,
  nome_fantasia: string,
  nome_mae: string,
  inscricao_municipal: string,
  inscricao_estadual: string 
) {
  return await PessoaModel.update(
    {
      id_pessoa: id_pessoa,
      nome: nome,
      identificacao: identificacao,
      nome_fantasia: nome_fantasia,
      nome_mae: nome_mae,
      inscricao_municipal: inscricao_municipal,
      inscricao_estadual: inscricao_estadual,
    },
    { where: { id_pessoa } }
  );
}

// valida se existe pessoas iguais antes de realizar o cadastro
export async function getPessoaDetails(details: Partial<PessoaModel>): Promise<PessoaModel | null> {
  try {
    const endereco = await PessoaModel.findOne({
      where: details,
    });

    return endereco; 
  } catch (error) {
    throw new Error(`Erro ao buscar a pessoa por detalhes: ${error.message}`);
  }
}

export async function getIdentificacao(details: Partial<PessoaModel>): Promise<PessoaModel | null> {
  try {
    const endereco = await PessoaModel.findOne({
      where: details,
    });

    return endereco;
  } catch (error) {
    throw new Error(`Erro ao buscar a pessoa por detalhes: ${error.message}`);
  }
}

// Controller para listar pessoas e clientes atrelados
export async function getPessoaCliente() {
  try {
    const combineTables = await PessoaModel.findAll({
      include: [
        {
          model: ClienteModel,
          as: 'cliente',
          required: false,
        },
      ],
    });

    // Filtrar as entradas sem cliente associado
    const resultadoFiltrado = combineTables.filter((pessoa) => pessoa.cliente !== null);

    return resultadoFiltrado;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Serviço para exclusão a pessoa
export async function deletePessoa(id_pessoa: string){
  return await PessoaModel.destroy({where: { id_pessoa }})
}  