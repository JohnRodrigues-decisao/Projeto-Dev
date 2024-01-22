import { Model, Sequelize, DataTypes } from "sequelize";

export class representanteModel extends Model {
    public id_representante!: string;
    public nome!: string;
    public identificacao!: string;

    public id_pessoa!: string;

    static initialization(db: Sequelize) {
        this.init(
                {
                id_representante: {
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
                id_pessoa: {
                    type: DataTypes.UUID,
                    allowNull: false,
                  },

                },
                {
                sequelize: db,
                modelName: "Representante",
                updatedAt: false,
                createdAt: false,
                }
        );
    }
};