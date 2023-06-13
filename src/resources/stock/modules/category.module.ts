import { Module } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryController } from '../controllers/category.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { categoryProviders } from '../providers/category.providers';


@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService, ...categoryProviders]
})
export class CategoryModule {}
