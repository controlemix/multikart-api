import { Module } from '@nestjs/common';
import { MediasService } from '../services/medias.service';
import { MediasController } from '../controllers/medias.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { mediasProviders } from '../providers/medias.providers';
import { AuthService } from 'src/resources/auth/auth.service';
import { authProviders } from 'src/resources/auth/auth.providers';

import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [MediasController],
  providers: [MediasService, ...mediasProviders, AuthService, ...authProviders, JwtService ],
})
export class MediasModule {}
