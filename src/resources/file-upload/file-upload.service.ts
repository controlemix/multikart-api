import { Injectable } from '@nestjs/common';
import { MinioClientService } from '../../core/minio/services/minio-client.service';
import { BufferedFile } from '../../core/minio/interfaces/file.interface';

@Injectable()
export class FileUploadService {
  constructor(
    private minioClientService: MinioClientService
  ) {}

  async uploadSingle(image: BufferedFile) {
    const uploaded_image = await this.minioClientService.upload( image)
    return {
      imageUrl: uploaded_image.url,
      fileName: uploaded_image.fileName
    }
  }
  async uploadCategorySingle(image: any, req: any) {
    
    const uploaded_image = await this.minioClientService.uploadCategory(image, req)

    return {
      ...uploaded_image,
      imageUrl: uploaded_image.url,
      fileName: uploaded_image.fileName
    }
  }

  async uploadMany(files: BufferedFile) {
    
    const image1 = files['image1'][0]
    const uploaded_image1 = await this.minioClientService.upload(image1)

    const image2 = files['image2'][0]
    const uploaded_image2 = await this.minioClientService.upload(image2)
    
    return {
      image1_url: uploaded_image1.url,
      image2_url: uploaded_image2.url,
      message: 'Successfully uploaded mutiple image on MinioS3'
    }
  }
}
