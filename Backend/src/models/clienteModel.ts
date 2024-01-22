import { Model, Sequelize, DataTypes, DATE } from "sequelize";
import { Models } from ".";

export class ClienteModel extends Model {
  public id_cliente!: string;
  public data_cadastro!: Date;
  public situacao!: string;
  public id_pessoa!: string;

  static initialization(db: Sequelize) {
    this.init(
      {
        id_cliente: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        data_cadastro: {
          type: new DATE(),
          allowNull: false,
        },
        situacao: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        id_pessoa: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize: db,
        modelName: "Cliente",
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
