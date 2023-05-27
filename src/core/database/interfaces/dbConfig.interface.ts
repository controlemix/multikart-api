export interface IMySQLDatabaseConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number | string;
  dialect?: string;
  urlDatabase?: string;
}

export interface ISQLiteDatabaseConfigAttributes {
  dialect?: string;
  storage?: string;
}

export interface IMySQLDatabaseConfig {
  development: IMySQLDatabaseConfigAttributes;
  test: IMySQLDatabaseConfigAttributes;
  production: IMySQLDatabaseConfigAttributes;
}

export interface ISQLiteDatabaseConfig {
  development: ISQLiteDatabaseConfigAttributes;
  test: ISQLiteDatabaseConfigAttributes;
  production: ISQLiteDatabaseConfigAttributes;
}
