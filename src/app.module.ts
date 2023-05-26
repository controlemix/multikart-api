import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';
import { NavbarsModule } from "./resources/navbars/navbars.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    NavbarsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



// import { Module } from "@nestjs/common";
// import { UsersModule } from "./resources/users/users.module";
// import { NavbarsModule } from "./resources/navbars/navbars.module";
// import { DatabaseModule } from "./core/database/database.module";

// @Module({
//   imports: [DatabaseModule, UsersModule, NavbarsModule]
// })

// export class AppModule { }
