import { Module } from '@nestjs/common';
import { MinioClientService } from '../services/minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import {MINIO_ENDPOINT, MINIO_PORT, MINIO_ACCESSKEY, MINIO_SECRETKEY }  from '../../constants/index'
import { MediasService } from 'src/resources/medias/services/medias.service';
import { mediasProviders } from 'src/resources/medias/providers/medias.providers';
import { CategoryImageService } from 'src/resources/stock/services/category.image.service';
import { categoryImageProviders } from 'src/resources/stock/providers/category.image.provider';

@Module({
  imports: [
    MinioModule.register({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: MINIO_ACCESSKEY,
      secretKey: MINIO_SECRETKEY,
    }),
  ],
  providers: [
    MinioClientService, 
    MediasService, ...mediasProviders,
    CategoryImageService, ...categoryImageProviders
  ],
  exports: [MinioClientService, MediasService]
})
export class MinioClientModule {}
