import { v4 } from "uuid";
import { ContaInterface } from "../interfaces/contaInterface";
import { ContaModel } from "../models/contaModel";

// Serviço para criar uma nova conta
export async function postConta( conta: ContaInterface ) {
      return await ContaModel.create({
            id_conta: v4(),
            nome: conta.nome,
            email: conta.email,
            senha: conta.senha
      })
}

// Serviço para editar uma conta
export async function updateConta(
            id_conta: string,
            nome: string,
            email: string,
            senha: string
      ) {
      return await ContaModel.update({
                  id_conta: id_conta,
                  nome: nome,
                  email: email,
                  senha: senha
            }, 
            { where: { id_conta } }
      )
      
} 

// Serviço para listar um usuário
export async function getUser(id_conta: string) {
      return await ContaModel.findOne({
            where: { id_conta },
      });
};