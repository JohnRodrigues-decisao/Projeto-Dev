import { Request, Response } from "express";
import { getEnderecos, postEndereco, putEndereco, deleteEndereco, getEndereco, getEnderecoIsPrincipal, desabilitarIsPrincipalService, getEnderecoByDetails, getOneEndereco } from "../services/enderecoService";

// Controller para listar todos endereço
export async function listAllEnderecos(_, res: Response) {
      try {
            const endereco = await getEnderecos();
            return res.json(endereco);
      } catch (error) {
            return res.json(`error: ${error}`); 
      }
}

// Controller para listar um endereço pelo id_pessoa
export async function listEndereco(req: Request, res: Response) {
  try {
    const { id_pessoa } = req.params;

    const findendereco = await getEndereco(id_pessoa);

    if(findendereco){
      return res.json(findendereco);
    } else {
      return res.json({ msg: "Essa pessoa não possui endereços cadastrados" });
    }
  } catch (error) {
    return res.json("Error ao realizar a requisição.");
  }
}
 
// Controller para listar um endereço por id_endereco
export async function listOneEndereco(req: Request, res: Response) {
  try {
    const { id_endereco } = req.params;

    const findendereco = await getOneEndereco(id_endereco);

    if(findendereco){
      return res.json(findendereco);
    } else {
      return res.json({ msg: "Essa pessoa não possui endereços cadastrados" });
    }
  } catch (error) {
    return res.json("Error ao realizar a requisição.");
  }
}

// Controller para criar o endereço
export async function createEndereco(req: Request, res: Response): Promise<any> {
  try {
    const { cep, logradouro, numero, complemento, bairro, cidade, estado, is_principal, id_pessoa } = req.body;

    const existingEndereco = await getEnderecoByDetails({ cep, logradouro, numero, complemento, bairro, cidade, estado, id_pessoa });

    if (existingEndereco) {
      return res.status(400).json({ msg: 'Endereço duplicado, não é possível cadastrar.' });
    }

    const endereco = {
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      is_principal,
      id_pessoa,
    };

    const newEndereco = await postEndereco(endereco);

    if (is_principal) {
      await getEnderecoIsPrincipal(id_pessoa); 
    }

    return res.json(newEndereco.id_pessoa);
  } catch (error) {
    console.error(`Erro ao criar o endereço: ${error}`);
    return res.status(500).json({ msg: 'Erro interno do servidor' });
  }
}

// Controller para editar um endereço
export async function editEndereco(req: Request, res: Response) {
      try {
            const { id_endereco } = req.params;
            const { cep, logradouro, numero, complemento, bairro, cidade, estado, is_principal, id_pessoa } = req.body;

            const existingEndereco = await getEnderecoByDetails({ cep, logradouro, numero, complemento, bairro, cidade, estado, id_pessoa });

            if (existingEndereco) {
              return res.status(400).json({ msg: 'Endereço duplicado, não é possível cadastrar.' });
            }

            const newValueEndereco = await putEndereco(
                  id_endereco,
                  cep, 
                  logradouro,
                  numero,
                  complemento,
                  bairro, 
                  cidade,
                  estado,
                  is_principal,
                  id_pessoa
            );

            if (newValueEndereco[0] === 1) {
              return res.json({ msg: "Endereço alterado com sucesso!👌" });
            } else {
              return res.json({
                msg: "Endereço não encontrado, operação não realizada!💃",
              });
            }

      } catch (error) {
            return res.json(`Erro ao realizar a requisição`);

      }
}

// Controller para excluir um endereço
export async function destroyEndereco(req: Request, res: Response) {
      try {
            const { id_endereco } = req.params;
            const deletEndereco = await deleteEndereco(id_endereco);

            
            if (deletEndereco) {
              return res.json({ msg: "Endereço deletado com sucesso!👌" });
            } else {
              return res.json({
                msg: "Endereço não encontrado, operação não realizada!💃",
              });
            }

      } catch (error) {
            return res.json("Error ao realizar a requisição.");
 
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

  