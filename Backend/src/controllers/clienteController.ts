import { Request, Response } from "express"; 
import { ClienteInterface } from "../interfaces/clienteInterface";
import { postClient, getClients, putClient, deleteCliente, getClientPessoa } from "../services/clienteService";

import { ClienteModel } from "../models/clienteModel";
import { format } from 'date-fns';



// Criar um cliente
export async function createClient(req: Request, res: Response) {
      try {
            const { data_cadastro, situacao, id_pessoa } = req.body;

            const clientColet: ClienteInterface = {
                  data_cadastro: data_cadastro,
                  situacao: situacao,
                  id_pessoa: id_pessoa
            }

            const newClient = await postClient(clientColet);

            return res.json(newClient);
      } catch (error) {
            return res.json(`Error: ${error}`);
      }
}

// lister todos os cliente 

export async function listarClients(_, res: Response) {
    try {
        const clientes = await getClients();
        const clientesFormatados = clientes.map(({ dataValues }) => ({
            id_cliente: dataValues.id_cliente,
            data_cadastro: format(new Date(dataValues.data_cadastro), 'dd/MM/yyyy'),
            situacao: dataValues.situacao,
            id_pessoa: dataValues.id_pessoa,
        }));

        return res.json(clientesFormatados);
    } catch (error) {
        return res.json(`Error: ${error}`);
    }
  }

// lister um cliente // Nem vou usar
export async function listarClient(req: Request, res: Response) {
      const { id_cliente } = req.params;
      const client = await ClienteModel.findByPk(id_cliente);

      if (client) {
            // Formatando a data_cadastro se existir
            if (client.dataValues && client.dataValues.data_cadastro) {
                  client.dataValues.data_cadastro = format(new Date(client.dataValues.data_cadastro), 'dd/MM/yyyy');
            }
            
            res.send(client);
      } else {
            res.status(404).json({
                  msg: `Erro ao listar o cliente com esse id: ${id_cliente}`,
            });
      }
}

// lister um cliente com o id pessoa
export async function listarClientPessoa(req: Request, res: Response) {
  
      const { id_pessoa } = req.params;
      const client = await getClientPessoa(id_pessoa);

      if (client) {
            if (client.dataValues && client.dataValues.data_cadastro) {
                  client.dataValues.data_cadastro = format(new Date(client.dataValues.data_cadastro), 'dd/MM/yyyy');
            }
            
            res.send(client);
      } else {
            res.status(404).json({
                  msg: `Erro ao listar o cliente com esse id: ${id_pessoa}`,
            });
      }
}

// editar UM cliente
export async function editClient(req: Request, res: Response) {
      const { id_cliente } = req.params;
      const { data_cadastro, situacao, id_pessoa } = req.body;

      const newClientDate = await putClient(
            id_cliente,
            data_cadastro, 
            situacao, 
            id_pessoa
      );

      if (newClientDate[0] === 1) {
            return res.json({ msg: "Data do cliente alterada com sucesso!👌" });
      } else {
            return res.json({
            msg: "Cliente não encontrado, operação não realizada!💃",
            });
      }
}

// Excluir um cliente
export async function destroyClient(req: Request, res: Response) {
      try {
            const { id_pessoa } = req.params;
            const delPessoaCliente = await deleteCliente(id_pessoa);

            if (delPessoaCliente) {
                  return res.json({
                        msg: "Cliente deletado com sucesso!👌",
                  });
            } else {
                  return res.json({
                        msg: "Cliente não encontrado, operação não realizada!💃",
                  });
            }

      } catch (error) {
            return res.json("Error ao realizar a requisição.");
      }
};