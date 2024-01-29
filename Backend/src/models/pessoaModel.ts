import { Model, Sequelize, DataTypes } from "sequelize";
import { Models } from ".";

export class PessoaModel extends Model {
  public id_pessoa!: string;

  public nome!: string;
  public identificacao!: string;
  public nome_fantasia!: string;
  public nome_mae!: string;
  public inscricao_municipal!: string;
  public inscricao_estadual!: string;
  cliente: null;

  static initialization(db: Sequelize) {
    this.init(
      {
        id_pessoa: { 
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        identificacao: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nome_fantasia: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nome_mae: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        inscricao_municipal: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        inscricao_estadual: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize: db,
        modelName: "Pessoa",
        updatedAt: false,
        createdAt: false,
      }
    );
  }

  // Associando ao endereço
  static association(models: Models) {
    this.belongsTo(models.endereco, {
      as: "endereco",
      foreignKey: {
        field: "id_pessoa", 
        name: "id_pessoa", 
      },
    });

    this.belongsTo(models.email, {
      as: "email",
      foreignKey: {
        field: "id_pessoa", 
        name: "id_pessoa", 
      },
    });

    this.belongsTo(models.telefone, {
      as: "telefone",
      foreignKey: {
        field: "id_pessoa", 
        name: "id_pessoa", 
      },
    });

    this.hasOne(models.cliente, {
      as: "cliente",
      foreignKey: {
        field: "id_pessoa", 
        name: "id_pessoa", 
      },
    });

    this.belongsTo(models.representante, {
      as: "representante",
      foreignKey: {
        field: "id_pessoa", 
        name: "id_pessoa", 
      },
    });
  }
}
 