import { Injectable, Logger, HttpException, HttpStatus,  } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Stream } from 'stream';
import { MINIO_BUCKET, MINIO_ENDPOINT, MINIO_PORT } from '../../constants'
import { BufferedFile } from '../interfaces/file.interface';
import * as crypto from 'crypto'
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
@Injectable()
export class MinioClientService {
    private readonly logger: Logger;
    private readonly baseBucket = MINIO_BUCKET

  public get client() {
    return this.minio.client;
  }

  constructor(
    private readonly minio: MinioService,
  ) {
    this.logger = new Logger('MinioStorageService');
  }

  public async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
    if(!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
    }
    const temp_filename = Date.now().toString()
    const hashedFileName = crypto.createHash('md5').update(temp_filename).digest("hex");
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    const filename = hashedFileName + ext
    const fileName = `${filename}`;
    const fileBuffer = file.buffer;
    this.client.putObject(baseBucket,fileName,fileBuffer,metaData, function(err, res) {
      if(err) throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
    })

    return {
      url: `${MINIO_ENDPOINT}:${MINIO_PORT}/${MINIO_BUCKET}/${filename}`,
      fileName 
    }
  }
  public async uploadCategory(file: BufferedFile, req: any, baseBucket: string = this.baseBucket ) {
    if(!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
    }
    const temp_filename = Date.now().toString()
    const hashedFileName = crypto.createHash('md5').update(temp_filename).digest("hex");
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    let token = JSON.parse(JSON.stringify(req?.rawHeaders));
    const index = token.indexOf('Token-Definitions');
    token = token[index+1];

    const tokenDefinitions: any =  new JwtService(JwtModule
      .register({ 
        secret: 'secretKey', 
        signOptions: { expiresIn: '60s' } 
      }))
      .decode(token, { complete: true });

    console.log('tokenDefinitions ', tokenDefinitions?.payload);
    
   

    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Store-Item': tokenDefinitions?.payload?.storeItem || 'N/D',
      'X-Amz-Meta-Store-Item-Id': tokenDefinitions?.payload?.storeItemId || 'N/D',
      'X-Amz-Meta-File-Original-Name': file?.originalname || 'N/D',      
      'X-Amz-Meta-Token': token || 'N/D',      
      // 'X-Amz-Meta-Client-Id': tokenDefinitions?.payload?.clientId || 'N/D',
      // 'X-Amz-Meta-Shop-Id': tokenDefinitions?.payload?.shopId || 'N/D',      
    };
    const filename = hashedFileName + ext
    const fileName = `${filename}`;
    const fileBuffer = file.buffer;
    this.client.putObject(baseBucket,fileName,fileBuffer,metaData, function(err, res) {
      if(err) throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
    })

    return {
      url: `${MINIO_ENDPOINT}:${MINIO_PORT}/${MINIO_BUCKET}/${filename}`,
      fileName 
    }
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    this.client.removeObject(baseBucket, objetName, function(err, res) {
      if(err) throw new HttpException("Oops Something wrong happend", HttpStatus.BAD_REQUEST)
    })
  }
}
