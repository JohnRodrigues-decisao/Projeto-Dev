import { Dialect, Options, Sequelize } from "sequelize";
import { Models } from "../models/index";

class Connection {
      private config: Options;
      public sequelize: Sequelize;
      public models: Models;

      constructor() {
            this.config = { 
                  database: process.env.DB_DATABASE, 
                  username: process.env.DB_USERNAME, 
                  password: process.env.DB_PASSWORD,
                  port: Number(process.env.DB_PORT),
                  host: process.env.DB_HOST,
                  dialect: 'postgres' as Dialect, 
                  define: { freezeTableName: true }, 
                  sync: { force: false },
            };
            this.sequelize = new Sequelize(this.config);
            this.models = new Models(this.sequelize);
      }
} 

export const db = new Connection();
 
(async () => {
      await db.sequelize.sync();
})();