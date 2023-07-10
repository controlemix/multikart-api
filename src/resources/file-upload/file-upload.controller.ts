import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Response, Body, Request, Param, Put } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express'
import { FileUploadService } from './file-upload.service';
import { BufferedFile } from '../../core/minio/interfaces/file.interface';

@Controller('file-upload')
export class FileUploadController {
  constructor(
    private fileUploadService: FileUploadService
  ) {}

  // @UseInterceptors(FileInterceptor('image'))
  @Post('single/category')  
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'storeItem', maxCount: 100 },
  ]))
  async uploadSingle(
    @UploadedFiles() files:  any,
    @Response() res: any, 
    @Request() req: any
  ) {

    try {
      // console.log('image', files);
      const image = files['image'][0]
      // const storeItem = files['storeItem'][0]
      // console.log('image', image);
      // console.log('body', storeItem);
      
      const uploaded_image = await this.fileUploadService.uploadCategorySingle(image, req)
      console.log('uploaded_image', uploaded_image);
      
      return res.status(201).json({
        statusCode: 201,
        status: "OK",
        message: "The uploaded image has been successfully uploaded to MinIO S3",
        data: uploaded_image
      });
    }
    catch (error) {
      return res.status(500).json({
        statusCode: 500,
        status: "Error",
        message: error.message,
        error: "Internal Server Error"
      });
    }
  }
  
  @Put('single/category/:id')  
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'storeItem', maxCount: 100 },
  ]))
  async uploadSingleUpdate(
    @Param('id') id: string,
    @UploadedFiles() files:  any,
    @Response() res: any, 
    @Request() req: any
  ) {

    try {
      // console.log('image', files);
      const image = files['image'][0]
      // const storeItem = files['storeItem'][0]
      // console.log('image', image);
      // console.log('body', storeItem);
      
      const uploaded_image = await this.fileUploadService.uploadCategorySingleUpdate(id, image, req)
      console.log('uploaded_image', uploaded_image);
      
      return res.status(201).json({
        statusCode: 201,
        status: "OK",
        message: "The uploaded image has been successfully uploaded to MinIO S3",
        data: uploaded_image
      });
    }
    catch (error) {
      return res.status(500).json({
        statusCode: 500,
        status: "Error",
        message: error.message,
        error: "Internal Server Error"
      });
    }
  }

  @Post('many')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
  ]))
  async uploadMany(
    @UploadedFiles() files: BufferedFile,
  ) {
    return this.fileUploadService.uploadMany(files)
  }
}
