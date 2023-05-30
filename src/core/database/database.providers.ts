import { Sequelize } from "sequelize-typescript";

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from "../constants";
import { databaseConfigMySQL, databaseConfigSQLite } from "./database.config";
import { User } from "../../resources/users/user.entity";
import { Navbar } from "../../resources/navbars/entities/navbar.entity";
import { Category } from "../../resources/categories/entities/category.entity";
import { Menu } from "../../resources/menus/entities/menu.entity";
import { MenuChildren } from "../../resources/menus/entities/menu-children.entity";
// import { MenuSubChildren } from "../../resources/menus/entities/menu.entity";

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      if (process.env.DB_DIALECT === "mysql") {
        switch (process.env.NODE_ENV) {
          case DEVELOPMENT:
            config = databaseConfigMySQL.development;
            break;
          case TEST:
            config = databaseConfigMySQL.test;
            break;
          case PRODUCTION:
            config = databaseConfigMySQL.production;
            break;
          default:
            config = databaseConfigMySQL.development;
        }
      } else if (process.env.DB_DIALECT === "sqlite") {
        switch (process.env.NODE_ENV) {
          case DEVELOPMENT:
            config = databaseConfigSQLite.development;
            break;
          case TEST:
            config = databaseConfigSQLite.test;
            break;
          case PRODUCTION:
            config = databaseConfigSQLite.production;
            break;
          default:
            config = databaseConfigSQLite.development;
        }
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Navbar, Category, Menu, MenuChildren]);
      await sequelize.sync();
      return sequelize;
    }
  }
];
