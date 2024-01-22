import { v4 } from "uuid";
import { ClienteInterface } from "../interfaces/clienteInterface";
import { ClienteModel } from "../models/clienteModel";
import { PessoaModel } from "../models/pessoaModel";

// Serviço para criar um cliente
export async function postClient(cliente: ClienteInterface) {
      return await ClienteModel.create({
        id_cliente: v4(),
        data_cadastro: new Date(),
        situacao: cliente.situacao,
        id_pessoa: cliente.id_pessoa
      });
};

// Serviço para listar todos os cliente
export async function getClients() {
  return await ClienteModel.findAll();
}

// Serviço para listar um cliente com o id pessoa
export async function getClientPessoa(id_pessoa){
  return await ClienteModel.findOne({ where: { id_pessoa } })
}

// Serviço para editar cliente
export async function putClient(
  id_cliente: string,
  data_cadastro: Date, 
  situacao: string,
  id_pessoa: string
  ) {
    return await ClienteModel.update(
      {
        id_cliente: id_cliente,
        data_cadastro: data_cadastro,
        situacao: situacao,
        id_pessoa: id_pessoa,
      },
      { where: { id_cliente } }
    );
}

// Serviço para deletar o cliente
export async function deleteCliente(id_pessoa) {
  return await ClienteModel.destroy({ where: { id_pessoa } });
};