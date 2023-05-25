import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { DatabaseModule } from "./database/database.module";
import { NavbarsModule } from "./navbars/navbars.module";

@Module({
  imports: [DatabaseModule, UsersModule, NavbarsModule]
})
export class AppModule {}
