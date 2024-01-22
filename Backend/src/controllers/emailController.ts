import { Request, Response } from "express"; 
import { EmailInterface } from "../interfaces/emailInterface";
import {
  postEmail,
  getEmail,
  putEmail,
  deleteEmail,
  getEmailPessoa,
  getEmailId,
} from "../services/emailService"; 

// Controller para criar uma email
export async function createEmail(req: Request, res: Response) {
      try {
            const { email, is_principal, id_pessoa } = req.body;

            const emailColet: EmailInterface = {
                  email: email,
                  is_principal: is_principal,
                  id_pessoa: id_pessoa
            };

            const newEmail = await postEmail(emailColet);

            return res.json(newEmail);
            
      } catch (error) {

            return res.json(`Error: ${error}`);
      }
}

// Controller para listar todos os emails
export async function listEmail(_, res: Response) {
      try {
            const email = await getEmail();
            return res.json(email);
      } catch (error) {
            return res.json(`Error: ${error}`);
      };
};

// Controller para listar todos os emails pelo id_pessoa
export async function listEmailsPessoa(req: Request, res: Response) {
      const { id_pessoa } = req.params;

      const findemail = await getEmailPessoa(id_pessoa);

      if(findemail){
        return res.json(findemail);
      } else {
        return res.json({ msg: "Essa pessoa não possui emails cadastrados" });
      }
}
 
// Controller para listar todos os emails pelo id_pessoa
export async function listEmailPrId(req: Request, res: Response) {
      const { id_email } = req.params;

      const findemail = await getEmailId(id_email);

      if(findemail){
        return res.json(findemail);
      } else {
        return res.json({ msg: "Essa pessoa não possui email cadastrado" });
      }
}
 
// Controller para editar um email
export async function editEmail(req: Request, res: Response) {
      
      const { id_email } = req.params;

      const { email, is_principal, id_pessoa } = req.body; 

      const newEmail = await putEmail(
            id_email, 
            email, 
            is_principal, 
            id_pessoa
      );

      if (newEmail[0] === 1) {
            return res.json({ msg: "Endereço alterado com sucesso!👌" });
      } else {
            return res.json({
            msg: "Endereço não encontrado, operação não realizada!💃",
            });
      }
}

// Controller para excluir  um email
export async function destroyEmail(req: Request, res: Response) {
 try {
      const { id_email } = req.params;
      const delEmail = await deleteEmail(id_email);
      
      if (delEmail) {
        return res.json({
          msg: "Endereço deletado com sucesso!👌",
        });
      } else {
        return res.json({
          msg: "Endereço não encontrado, operação não realizada!💃",
        });
      }
 } catch (error) {
      return res.json("Error ao realizar a requisição.");

 }     
}