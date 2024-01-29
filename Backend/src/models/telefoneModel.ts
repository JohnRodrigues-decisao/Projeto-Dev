import { Model, Sequelize, DataTypes } from "sequelize";
import { Models } from ".";

export class TelefoneModel extends Model {
  public id_telefone!: string;
  public numero!: string;
  public is_principal!: boolean;

  public id_pessoa!: string;

  static initialization(db: Sequelize) {
    this.init(
      {
        id_telefone: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },

        numero: {
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
        modelName: "Telefone",
        timestamps: true,
        createdAt: true,
        updatedAt: true
      }
    );
  }

  // Associando a tabela pessoa
  static association(models: Models) {
    this.belongsTo(models.pessoa, {
      as: "pessoa",
      foreignKey: {
        field: "id_pessoa", 
        name: "id_pessoa",
      },
    });
  }
}
