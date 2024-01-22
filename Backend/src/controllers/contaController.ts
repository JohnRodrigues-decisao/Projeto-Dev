import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ContaInterface } from './../interfaces/contaInterface';
import { getUser, postConta, updateConta } from "../services/contaService";
import { ContaModel } from "../models/contaModel";

// Criar nova conta
export async function createConta(req: Request, res: Response) {
      const {nome, email, senha} = req.body;

      const conta = await ContaModel.findOne({ where: { email: email } })
      
      if (conta) {
            return res.status(400).json({
                  msg: `Já existe um usuário com este email cadastrado.`,
            });
      }

      const hashPassword = await bcrypt.hash(senha, 10);

      try {
            const conta: ContaInterface = {
              nome: nome,
              email: email,
              senha: hashPassword,
            };

            const newConta = await postConta(conta);
            return res.json(
              {
                  msg: `Usuário cadastrado com sucesso!🔥`
              }
            );
            
      } catch (error) {
            return res.json({
              msg: "Usuário inexistente!",
            });
      }
}

// Realizar login
export async function loginConta(req: Request, res: Response) {
      const { email, senha } = req.body;
    
      try {
            const conta: any = await ContaModel.findOne({ where: { email: email } });

            if (!conta) {
                  return res.status(400).json({ msg: `Usuário inexistente!` });
            } 

            // Validamos a senhaz
            const senhaValida = await bcrypt.compare(senha, conta.senha);
            if (!senhaValida) {
                  return res.status(400).json({ msg: "Usuário ou senha inválida!" });
            }

            // Geramos o token
      
            res.json({ id_conta: conta.id_conta, nome: conta.nome, email });

      } catch (error) {
            return res.status(500).json(`Erro ao realizar a requisição: ${error}`);
      }
}  

// Editar um usuário
export async function editConta(req: Request, res: Response) {
      try {
            const { id_conta } = req.params;
            const { nome, email, currentPassword, newPassword } = req.body;

            // Validar entradas
            if (!nome || !email || !currentPassword || !newPassword) {
            return res.status(400).json({ msg: 'Por favor, forneça todos os campos necessários.' });
            }
 
            const conta: any = await ContaModel.findOne({ where: { id_conta: id_conta } });

            if (!conta) {
            return res.status(400).json({ msg: 'Usuário não encontrado.' });
            }

            const senhaValida = await bcrypt.compare(currentPassword, conta.senha);

            if (!senhaValida) {
            return res.status(400).json({ msg: 'Senha atual inválida.' });
            }

            const hashPassword = await bcrypt.hash(newPassword, 10);
            const newContaValue = await updateConta(id_conta, nome, email, hashPassword);

            if (newContaValue[0] === 1) {
            return res.json({ msg: 'Pessoa alterada com sucesso!👌' });
            } else {
            return res.json({ msg: 'Pessoa não encontrada, operação não realizada!💃' });
            }
      } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Erro interno do servidor' });
      }
}

// Listar um usuário 
export async function listConta(req: Request, res: Response) {
      try {
            const { id_conta } = req.params;

            const findUser = await getUser(id_conta);

            if(findUser){
                  return res.json(findUser);
            } else {
                  return res.json({ msg: "Pessoa não encontrado, operação não realizada!💃" });
            }
      } catch (error) {
            return res.status(500).json({ msg: "Erro interno do servidor" });
      }
}