import { Model, Sequelize, DataTypes } from "sequelize";
import { Models } from ".";

export class EmailModel extends Model {
  public id_email!: string;
  public email!: string;
  public is_principal!: boolean;

  public id_pessoa!: string;

  static initialization(db: Sequelize) {
    this.init(
      {
        id_email: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },

        email: {
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
        modelName: "Email",
        updatedAt: false,
        createdAt: false,
      }
    );
  }

  // Associando ao endereço
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
