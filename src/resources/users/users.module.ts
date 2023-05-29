import { Module } from '@nestjs/common';
import { DatabaseModule } from "src/core/database/database.module";
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { UsersController } from "./users.controller";
import { FirebaseCredentialsModule } from 'src/core/firebase/firebasecredentials.module';

@Module({
  imports: [DatabaseModule, FirebaseCredentialsModule],
  providers: [UsersService, ...usersProviders ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}


// import { Module } from "@nestjs/common";
// import { UsersController } from "./users.controller";
// import { UsersService } from "./users.service";
// import { usersProviders } from "./users.providers";
// import { DatabaseModule } from "src/core/database/database.module";

// @Module({
//   imports: [DatabaseModule],
//   controllers: [UsersController],
//   providers: [UsersService, ...usersProviders]
// })
// export class UsersModule {}
