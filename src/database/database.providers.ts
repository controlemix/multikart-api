import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Navbar } from 'src/navbars/entities/navbar.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
      });
      sequelize.addModels([User, Navbar]);
      await sequelize.sync();
      return sequelize;
    },
  },
];