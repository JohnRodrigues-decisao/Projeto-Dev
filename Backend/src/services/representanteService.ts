import { v4 } from "uuid";
import { representanteInterface } from "src/interfaces/representanteInterface";
import { representanteModel } from "../models/representanteModel";


// Serviço para criar um representante
export async function postRepres( representante: representanteInterface): Promise<representanteInterface> {
    return await representanteModel.create({
        id_representante: v4(),
        nome: representante.nome,
        identificacao: representante.identificacao,
        id_pessoa: representante.id_pessoa,
    })
};

// Listar todos os representante
export async function getRepres() {
    return await representanteModel.findAll();
};

// Listar um representante pelo id_Pessoa
export async function getOneRepres(id_representante: string) {
    return await representanteModel.findOne({ where: { id_representante } })
};

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

// Serviço para exclusão
export async function deleteRepres(id_representante: string) {
    return await representanteModel.destroy({ where: { id_representante } })
}

