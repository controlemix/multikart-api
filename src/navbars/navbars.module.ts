import { Module } from "@nestjs/common";
import { NavbarsService } from "./navbars.service";
import { NavbarsController } from "./navbars.controller";
import { DatabaseModule } from "../database/database.module";
import { navbarsProviders } from "./navbars.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [NavbarsController],
  providers: [NavbarsService, ...navbarsProviders]
})
export class NavbarsModule {}
