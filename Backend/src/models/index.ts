import { Sequelize } from "sequelize";

// Importação dos modelos
import { ClienteModel } from "../models/clienteModel";
import { ContaModel } from "../models/contaModel";
import { EmailModel } from "../models/emailModel";
import { EnderecoModel } from "../models/enderecoModel";
import { PessoaModel } from "../models/pessoaModel";
import { TelefoneModel } from "../models/telefoneModel";
import { representanteModel } from "./representanteModel";

export class Models {
      // Mapear todos os modelos

      public cliente: typeof ClienteModel = ClienteModel;
      public conta: typeof ContaModel = ContaModel;
      public pessoa: typeof PessoaModel = PessoaModel;
      public email: typeof EmailModel = EmailModel;
      public endereco: typeof EnderecoModel = EnderecoModel;
      public telefone: typeof TelefoneModel = TelefoneModel;
      public representante: typeof representanteModel = representanteModel;

      // Config pardrão do sequeçize 
      constructor(db: Sequelize) {
      Object.keys(this).forEach((pModel: string) => {
            if (
            this[pModel] !== undefined &&
            this[pModel].initialization !== undefined
            ) {
            this[pModel].initialization(db);
            }
      }); 

      Object.keys(this).forEach((pModel: string) => {
            if (
            this[pModel] !== undefined &&
            this[pModel].association !== undefined
            ) {
            this[pModel].association(this);
            }
      });
      }
}