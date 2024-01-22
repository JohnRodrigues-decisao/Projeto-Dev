import { v4 } from "uuid"; 
import { EnderecoInterface } from "../interfaces/enderecoInterface";

import { EnderecoModel } from "../models/enderecoModel";

// Serviço para criar o endereço
export async function postEndereco( endereco: EnderecoInterface ): Promise<EnderecoInterface> {
      return await EnderecoModel.create({
        id_endereco: v4(),
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        complemento: endereco.complemento, 
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        estado: endereco.estado,
        is_principal: endereco.is_principal,
        id_pessoa: endereco.id_pessoa
      }); 
}

// Serviço para listar todos os endereços 
export async function getEnderecos() {
  return await EnderecoModel.findAll();
};

// Serviço para buscar endereços por id_pessoa
export async function getEndereco(id_pessoa: string) {
  try {
    return await EnderecoModel.findAll({ where: { id_pessoa } });
  } catch (error) {
    console.error('Erro ao buscar o endereço:', error);

  }
} 

// Serviço para buscar endereços por id_endereco
export async function getOneEndereco(id_endereco: string) {
  try {
    return await EnderecoModel.findOne({ where: { id_endereco } });
  } catch (error) {
    console.error('Erro ao buscar o endereço:', error);

  }
} 

// Serviço para buscar um endereço
export async function getEnderecoIsPrincipal(id_pessoa: string) {
  try {
    return await EnderecoModel.findAll({ where: { id_pessoa, is_principal: true } });
  } catch (error) {
    console.error('Erro ao buscar o endereço:', error);
  }
}

// Serviço para editar os endereços
export async function putEndereco(
  id_endereco: string,
  cep: string,
  logradouro: string,
  numero: string,
  complemento: string,
  bairro: string,
  cidade: string,
  estado: string,
  is_principal: boolean,
  id_pessoa: string
) {
  try {
    // Verifica se is_principal foi alterado
    const enderecoAntigo = await EnderecoModel.findByPk(id_endereco);
    const isPrincipalAntigo = enderecoAntigo?.is_principal || false;

    const updatedEndereco = await EnderecoModel.update(
      {
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        is_principal,
        id_pessoa,
      },
      { where: { id_endereco } }
    );

    // Se is_principal foi alterado, atualiza os outros endereços para is_principal = false
    if (is_principal !== isPrincipalAntigo) {
      await getEnderecoIsPrincipal(id_pessoa);
    }

    return updatedEndereco;
  } catch (error) {
    console.error(`Erro ao atualizar o endereço: ${error}`);
    throw error;
  }
}

// Serviço para excluir o endereço
export async function deleteEndereco(id_endereco: string) {
  try {
    return await EnderecoModel.destroy({ where: { id_endereco } });
  } catch (error) {
    console.error('Erro ao excluir endereço:', error);
    throw error;
  }
}
 
// Servço para desabilitar todos os is_principal pelo id_pessoa
export async function desabilitarIsPrincipalService(id_pessoa: string): Promise<void> {
  try {
    await EnderecoModel.update(
      { is_principal: false },
      { where: { id_pessoa, is_principal: true } }
    );
  } catch (error) {
    throw new Error(`Erro ao desabilitar is_principal: ${error.message}`);
  }
}

// valida se existe endereços iguais antes de realizar o cadastro
export async function getEnderecoByDetails(details: Partial<EnderecoModel>): Promise<EnderecoModel | null> {
  try {
    const endereco = await EnderecoModel.findOne({
      where: details,
    });

    return endereco;
  } catch (error) {
    throw new Error(`Erro ao buscar endereço por detalhes: ${error.message}`);
  }
} 