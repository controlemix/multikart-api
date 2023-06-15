import { Module } from '@nestjs/common';
import { MinioClientService } from '../services/minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import {MINIO_ENDPOINT, MINIO_PORT, MINIO_ACCESSKEY, MINIO_SECRETKEY }  from '../../constants/index'

@Module({
  imports: [
    MinioModule.register({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: MINIO_ACCESSKEY,
      secretKey: MINIO_SECRETKEY,
    })
  ],
  providers: [MinioClientService],
  exports: [MinioClientService]
})
export class MinioClientModule {}
