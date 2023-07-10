import { Injectable, Logger, HttpException, HttpStatus,  } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Stream } from 'stream';
import { MINIO_BUCKET, MINIO_ENDPOINT, MINIO_PORT } from '../../constants'
import { BufferedFile } from '../interfaces/file.interface';
import * as crypto from 'crypto'
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { MediasService } from 'src/resources/medias/services/medias.service';
import { CategoryImageService } from 'src/resources/stock/services/category.image.service';

@Injectable()
export class MinioClientService {
    private readonly logger: Logger;
    private readonly baseBucket = MINIO_BUCKET

  public get client() {
    return this.minio.client;
  }

  constructor(
    private readonly minio: MinioService,
    private readonly mediasService: MediasService,
    private readonly categoryImageService: CategoryImageService,
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
    const index = token.indexOf('token-definitions');
    token = token[index+1];

    const tokenDefinitions: any =  new JwtService(JwtModule
      .register({ 
        secret: 'secretKey', 
        signOptions: { expiresIn: '60s' } 
      }))
      .decode(token, { complete: true });

    console.log('token ', token);
    console.log('tokenDefinitions ', tokenDefinitions);
    
   

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

    const mediadata = await this.mediasService.create({
      title: tokenDefinitions?.payload?.title|| 'N/D',
      originalName: file?.originalname,
      hashName: hashedFileName || 'N/D',
      encoding: file?.encoding || 'N/D',
      mimetype: file?.mimetype || 'N/D',
      itemStore: tokenDefinitions?.payload?.storeItem || 'N/D',
      itemId: tokenDefinitions?.payload?.storeItemId || 0,
      clientId: tokenDefinitions?.payload?.clientId || 0,
      shopId: tokenDefinitions?.payload?.shopId || 0,
      role: tokenDefinitions?.payload?.shopId || 0,
      size: tokenDefinitions?.payload?.size || 0,
      url: `/${MINIO_BUCKET}/${filename}`,
      token,  
      imageType: file?.mimetype || 'N/D',
      imageWidth: tokenDefinitions?.payload?.imageWidth || 'N/D',
      imageHeight: tokenDefinitions?.payload?.imageHeight || 'N/D',
      imageTitle: tokenDefinitions?.payload?.imageTitle || 'N/D',
      imageAlt: tokenDefinitions?.payload?.imageAlt || 'N/D',
      isActive: tokenDefinitions?.payload?.isActive || false,      
      domain: tokenDefinitions?.payload?.domain || 'N/D',
      port: tokenDefinitions?.payload?.port || 'N/D',
      bucket: tokenDefinitions?.payload?.bucket || 'N/D',
      order: tokenDefinitions?.payload?.order || 0,
      ranking: tokenDefinitions?.payload?.ranking || 0,
      description: tokenDefinitions?.payload?.description || 'N/D',
      tags: tokenDefinitions?.payload?.tags || 'N/D',
    })

    await this.categoryImageService.create({
      mediasId: mediadata.id,
      categoriesId: tokenDefinitions.payload.storeItemId,
    })
      

    return {
      id: mediadata.id,
      fileName,
      title: tokenDefinitions?.payload?.title|| 'N/D',
      originalName: file?.originalname,
      hashName: hashedFileName || 'N/D',
      encoding: file?.encoding || 'N/D',
      mimetype: file?.mimetype || 'N/D',
      itemStore: tokenDefinitions?.payload?.storeItem || 'N/D',
      itemId: tokenDefinitions?.payload?.storeItemId || 0,
      size: tokenDefinitions?.payload?.size || 0,
      url: `/${MINIO_BUCKET}/${filename}`,
      token,  
      imageType: file?.mimetype || 'N/D',
      imageWidth: tokenDefinitions?.payload?.imageWidth || 'N/D',
      imageHeight: tokenDefinitions?.payload?.imageHeight || 'N/D',
      imageTitle: tokenDefinitions?.payload?.imageTitle || 'N/D',
      imageAlt: tokenDefinitions?.payload?.imageAlt || 'N/D',
      isActive: tokenDefinitions?.payload?.isActive || false,      
      domain: tokenDefinitions?.payload?.domain || 'N/D',
      order: tokenDefinitions?.payload?.order || 0,
      ranking: tokenDefinitions?.payload?.ranking || 0,
      description: tokenDefinitions?.payload?.description || 'N/D',
      tags: tokenDefinitions?.payload?.tags || 'N/D',
    }

 
    // return {
    //   url: `${MINIO_ENDPOINT}:${MINIO_PORT}/${MINIO_BUCKET}/${filename}`,
    //   fileName 
    // }
  }
  public async uploadCategoryUpdate(id: string, file: BufferedFile, req: any, baseBucket: string = this.baseBucket ) {
    if(!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
    }

    const media = await this.mediasService.findOne(id);
    console.log('media ', media);
    
    // const temp_filename = media.hashName;
    const hashedFileName = media.hashName;
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    let token = JSON.parse(JSON.stringify(req?.rawHeaders));
    const index = token.indexOf('token-definitions');
    token = token[index+1];

    const tokenDefinitions: any =  new JwtService(JwtModule
      .register({ 
        secret: 'secretKey', 
        signOptions: { expiresIn: '60s' } 
      }))
      .decode(token, { complete: true });

    console.log('token ', token);
    console.log('tokenDefinitions ', tokenDefinitions);
    
   

    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Store-Item': media.itemStore,
      'X-Amz-Meta-Store-Item-Id': media.itemId,
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

    const mediadata = await this.mediasService.update(
      id,
      {
      title: tokenDefinitions?.payload?.title|| 'N/D',
      originalName: file?.originalname,
      hashName: hashedFileName || 'N/D',
      encoding: file?.encoding || 'N/D',
      mimetype: file?.mimetype || 'N/D',
      itemStore: tokenDefinitions?.payload?.storeItem || 'N/D',
      itemId: tokenDefinitions?.payload?.storeItemId || 0,
      clientId: tokenDefinitions?.payload?.clientId || 0,
      shopId: tokenDefinitions?.payload?.shopId || 0,
      role: tokenDefinitions?.payload?.shopId || 0,
      size: tokenDefinitions?.payload?.size || 0,
      url: `/${MINIO_BUCKET}/${filename}`,
      token,  
      imageType: file?.mimetype || 'N/D',
      imageWidth: tokenDefinitions?.payload?.imageWidth || 'N/D',
      imageHeight: tokenDefinitions?.payload?.imageHeight || 'N/D',
      imageTitle: tokenDefinitions?.payload?.imageTitle || 'N/D',
      imageAlt: tokenDefinitions?.payload?.imageAlt || 'N/D',
      isActive: tokenDefinitions?.payload?.isActive || false,      
      domain: tokenDefinitions?.payload?.domain || 'N/D',
      port: tokenDefinitions?.payload?.port || 'N/D',
      bucket: tokenDefinitions?.payload?.bucket || 'N/D',
      order: tokenDefinitions?.payload?.order || 0,
      ranking: tokenDefinitions?.payload?.ranking || 0,
      description: tokenDefinitions?.payload?.description || 'N/D',
      tags: tokenDefinitions?.payload?.tags || 'N/D',
    })

    // await this.categoryImageService.update({
    //   mediasId: mediadata.id,
    //   categoriesId: media.itemId,
    // })
      

    return {
      id: id,
      fileName,
      title: tokenDefinitions?.payload?.title|| 'N/D',
      originalName: file?.originalname,
      hashName: hashedFileName || 'N/D',
      encoding: file?.encoding || 'N/D',
      mimetype: file?.mimetype || 'N/D',
      itemStore: media.itemStore || 'N/D',
      itemId: media.itemId || 0,
      size: tokenDefinitions?.payload?.size || 0,
      url: `/${MINIO_BUCKET}/${filename}`,
      token,  
      imageType: file?.mimetype || 'N/D',
      imageWidth: tokenDefinitions?.payload?.imageWidth || 'N/D',
      imageHeight: tokenDefinitions?.payload?.imageHeight || 'N/D',
      imageTitle: tokenDefinitions?.payload?.imageTitle || 'N/D',
      imageAlt: tokenDefinitions?.payload?.imageAlt || 'N/D',
      isActive: tokenDefinitions?.payload?.isActive || false,      
      domain: tokenDefinitions?.payload?.domain || 'N/D',
      order: tokenDefinitions?.payload?.order || 0,
      ranking: tokenDefinitions?.payload?.ranking || 0,
      description: tokenDefinitions?.payload?.description || 'N/D',
      tags: tokenDefinitions?.payload?.tags || 'N/D',
    }

 
    // return {
    //   url: `${MINIO_ENDPOINT}:${MINIO_PORT}/${MINIO_BUCKET}/${filename}`,
    //   fileName 
    // }
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    this.client.removeObject(baseBucket, objetName, function(err, res) {
      if(err) throw new HttpException("Oops Something wrong happend", HttpStatus.BAD_REQUEST)
    })
  }
}
