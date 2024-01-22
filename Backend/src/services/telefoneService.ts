import { TelefoneInterface } from "../interfaces/telefoneInterface";
import { TelefoneModel } from "../models/telefoneModel";
import { v4 } from "uuid";


// Serviço para cira um telefone
export async function postTell( telefone: TelefoneInterface): Promise<TelefoneInterface> {
    return await TelefoneModel.create({
        id_telefone: v4(),
        numero: telefone.numero,
        is_principal: telefone.is_principal,
        id_pessoa: telefone.id_pessoa
    })
};

// Listar todos os telefoens
export async function getTell() {
    return await TelefoneModel.findAll();
};

// Listar um telefone pelo id_Pessoa
export async function getOneTell(id_pessoa: string) {
    return await TelefoneModel.findAll({ where: { id_pessoa } })
};

// Listar um telefone pelo id_telefone

export async function getTelelefone(id_telefone: string) {
    try {
      return await TelefoneModel.findOne({ where: { id_telefone } });
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
  
    }
}  

// Serviço para editar um telefone
export async function putTell(
    id_telefone: string,
    numero: string,
    is_principal: boolean,
    id_pessoa: string
) {
    return await TelefoneModel.update(
        {
            id_telefone: id_telefone, // validar se é para deixar aqui
            numero: numero,
            is_principal: is_principal,
            id_pessoa: id_pessoa
        },
        { where: { id_telefone } }
    )
}

// Serviço para exclusão
export async function deleteTell(id_telefone: string) {
    return await TelefoneModel.destroy({ where: { id_telefone } })
} 

// Servço para desabilitar todos os is_principal pelo id_pessoa
export async function desabilitarIsPrincipalService(id_pessoa: string): Promise<void> {
    try {
      await TelefoneModel.update(
        { is_principal: false },
        { where: { id_pessoa, is_principal: true } }
      );
    } catch (error) {
      throw new Error(`Erro ao desabilitar is_principal: ${error.message}`);
    }
}