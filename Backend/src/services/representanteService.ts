import { v4 } from "uuid";
import { representanteInterface } from "../interfaces/representanteInterface";
import { representanteModel } from "../models/representanteModel";


// Listar um representante pelo id_Pessoa
export async function getAllRepres(id_pessoa: string) {
    return await representanteModel.findAll({ where: { id_pessoa } })
};

// Serviço para criar um representante
export async function postRepres( representante: representanteInterface): Promise<representanteInterface> {
    return await representanteModel.create({
        id_representante: v4(), 
        nome: representante.nome,
        identificacao: representante.identificacao,
        id_pessoa: representante.id_pessoa,
    })
};  

// Serviço para exclusão
export async function deleteRepres(id_representante: string) {
    return await representanteModel.destroy({ where: { id_representante } })
}   

// Serviço para editar um representante
export async function putRepres(
    id_representante: string,
    nome: string,
    identificacao: string,
    id_pessoa: string 
) {
    return await representanteModel.update(
        {
            id_representante: id_representante,
            nome: nome,
            identificacao: identificacao,
            id_pessoa: id_pessoa
        },
        { where: { id_representante } }
    )
}

// Serviço para pegar dados do representatne pelo id_representatante
export async function getOneRepres(id_representante: string) {
    return await representanteModel.findOne({ where: { id_representante } })
};

// Serviço para pegar dados do representatne pelo id_representatante
export async function getPessoaRepres(id_pessoa: string) {
    return await representanteModel.findAll({ where: { id_pessoa } })
}; 

// Serviço para deletar representatne com id_pessoa
export async function deletePessoaRepres(id_pessoa: string) {
    return await representanteModel.destroy({ where: { id_pessoa } })
}; 