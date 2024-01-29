import { Model, Sequelize, DataTypes } from "sequelize";
import { Models } from ".";

export class EnderecoModel extends Model {
  public id_endereco!: string;

  public cep!: string;
  public logradouro!: string;
  public numero!: string;
  public complemento!: string;
  public bairro!: string;
  public cidade!: string;
  public estado!: string;
  public is_principal!: boolean;  
 
  public id_pessoa!: string; 
  createdAt: any;

  static initialization(db: Sequelize) {
    this.init(
      {
        id_endereco: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        cep: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        logradouro: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        numero: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        complemento: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        bairro: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cidade: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        estado: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_principal: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        id_pessoa: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize: db,
        modelName: "Endereco",
        timestamps: true,
        createdAt: true,
        updatedAt: true
      }
    );
  };

    // Associando ao endereço
  static association(models: Models){
    this.belongsTo(models.pessoa, {
      as: "pessoa",
      foreignKey: {
        field: "id_pessoa",
        name: "id_pessoa", 
      },
    });
  }

} 
