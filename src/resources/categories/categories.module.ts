import { Module } from '@nestjs/common';
import { DatabaseModule } from "src/core/database/database.module";
import { CategoriesService } from './categories.service';
import { categoriesProviders } from './categories.providers';
import { CategoriesController } from "./categories.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, ...categoriesProviders],
})
export class CategoriesModule {}




