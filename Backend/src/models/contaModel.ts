import { Model, Sequelize, DataTypes } from "sequelize";

export class ContaModel extends Model {
      public id_conta!: string;
      public nome!: string;
      public email!: string;
      public senha!: string;

      static initialization(db: Sequelize) {
            this.init(
                  {
                  id_conta: { 
                        type: DataTypes.UUID,
                        defaultValue: DataTypes.UUIDV4, 
                        allowNull: false,
                        primaryKey: true,
                  }, 
                  nome: {
                        type: DataTypes.STRING,
                        allowNull: false,
                  },
                  email: {
                        type: DataTypes.STRING,
                        allowNull: false,
                  },
                  senha: {
                        type: DataTypes.STRING,
                        allowNull: false,
                  },
                  },
                  {
                  sequelize: db,
                  modelName: "Conta",
                  updatedAt: false,
                  createdAt: false,
                  }
            );
      }
};