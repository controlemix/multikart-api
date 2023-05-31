import * as dotenv from 'dotenv';

import {
  IMySQLDatabaseConfig,
  ISQLiteDatabaseConfig,
} from './interfaces/dbConfig.interface';

dotenv.config();

export const databaseConfigMySQL: IMySQLDatabaseConfig = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_DEVELOPMENT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};

export const databaseConfigSQLite: ISQLiteDatabaseConfig = {
  development: {
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE_DEVELOPMENT,
  },
  test: {
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE_TEST,
  },
  production: {
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE_PRODUCTION,
  },
};
