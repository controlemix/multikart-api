import { Module } from "@nestjs/common";
import { UsersModule } from "./resources/users/users.module";
import { NavbarsModule } from "./resources/navbars/navbars.module";
import { DatabaseModule } from "./core/database/database.module";

@Module({
  imports: [DatabaseModule, UsersModule, NavbarsModule]
})

export class AppModule { }
