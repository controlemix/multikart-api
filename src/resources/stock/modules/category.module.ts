import { Module } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryController } from '../controllers/category.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { categoryProviders } from '../providers/category.providers';
import { AuthService } from 'src/resources/auth/auth.service';
import { authProviders } from 'src/resources/auth/auth.providers';

import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService, ...categoryProviders, AuthService, ...authProviders, JwtService ],
})
export class CategoryModule {}
