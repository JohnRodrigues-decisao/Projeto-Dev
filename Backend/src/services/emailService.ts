import { v4 } from "uuid";
import { EmailInterface } from "../interfaces/emailInterface";

import { EmailModel } from "../models/emailModel";

// Serviço para criar um email
export async function postEmail(email: EmailInterface) {
      return await EmailModel.create({
            id_email: v4(),
            email: email.email,
            is_principal: email.is_principal,
            id_pessoa: email.id_pessoa,
      });
}

// Serviço para listar todos os emails
export async function getEmail() {
      return await EmailModel.findAll();
};

// Serviço para listar todos os emails com o id_pessoa
export async function getEmailPessoa(id_pessoa: string) {
      try {
            return await EmailModel.findAll({ where: { id_pessoa } });
      } catch (error) {
            console.error('Erro ao buscar o email:', error);

      }
} 

// Serviço para listar todos os emails com o id_pessoa
export async function getEmailId(id_email: string) {
      try {
            return await EmailModel.findOne({ where: { id_email } });
      } catch (error) {
            console.error('Erro ao buscar o email:', error);

      }
} 
 

export async function putEmail(
      id_email: string,
      email: string, 
      is_principal: boolean, 
      id_pessoa: string
    ) {
      try {
        const updatedEmail = await EmailModel.update({
          id_email: id_email,
          email: email,
          is_principal: is_principal,
          id_pessoa: id_pessoa
        }, {
          where: { id_email }
        });
    
        return updatedEmail;
      } catch (error) {
        console.error('Erro ao atualizar e-mail:', error);
        throw error;
      }
    }
    

// Serviço para deletar um email
export async function deleteEmail(id_email) {
      return await EmailModel.destroy({ where: { id_email } });
};