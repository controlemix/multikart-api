import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";
import { MediasService } from '../services/medias.service';
import { CreateMediasDto } from '../dto/create-medias.dto'
import { UpdateMediasDto } from '../dto/update-medias.dto'
import { Medias } from '../entities/medias.entity';



@ApiTags("medias")
@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) { }

  @Post()
  @ApiParam({ type: Medias, name: "Medias" })
  @ApiOperation({ summary: "Create new Medias" })
  @ApiBody({ type: Medias })
  @ApiResponse({ status: 403, description: "Request forbidden by administrative rules." })
  @ApiResponse({ status: 201, description: "The request created has succeeded." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  async create(@Body() createMediasDto: CreateMediasDto, @Response() res: any): Promise<CreateMediasDto> {
    try {
      const medias = await this.mediasService.create(createMediasDto);
      return res.status(201).json({
        statusCode: 201,
        status: "OK",
        message: "The request created has succeeded.",
        data: medias
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

  @Get()
  async findAll(@Response() res: any): Promise<Medias[]> {
    try {
      const medias = await this.mediasService.findAll( );
      return res.status(200).json({
        statusCode: 200,
        status: "OK",
        message: "The request has succeeded.",
        data: medias
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

  @Get("/active")
  async findAllActive(@Response() res: any): Promise<Medias[]> {
    try {
      const medias = await this.mediasService.findAllActive();
      const mediasParsed = medias.filter((item) => item.isActive === true);
        
      const count = mediasParsed?.length || 0;
      return res.status(200).json({
        statusCode: 200,
        status: "OK",
        message: "The request has succeeded.",
        data: mediasParsed,
        count
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

  @Get(':id')
  async findOne(@Param('id') id: string, @Response() res: any) {
    try {
      const medias = await this.mediasService.findOne(id);
      return res.status(200).json({
        statusCode: 200,
        status: "OK",
        message: "The request has succeeded.",
        data: medias
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

  @Get('/active/:id')
  async findOneActive(@Param('id') id: string, @Response() res: any) {
    try {
      const medias = await this.mediasService.findOneActive(id);
      return res.status(200).json({
        statusCode: 200,
        status: "OK",
        message: "The request has succeeded.",
        data: medias
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

  @Put(':id')
  @ApiParam({ type: Medias, name: "Medias" })
  @ApiOperation({ summary: "Update Medias" })
  @ApiBody({ type: Medias })
  @ApiResponse({ status: 403, description: "Request forbidden by administrative rules." })
  @ApiResponse({ status: 201, description: "The request created has succeeded." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  async update(@Param('id') id: string, @Body() updateMediasDto: UpdateMediasDto, @Response() res: any) {
    try {
      const medias = await this.mediasService.update(id, updateMediasDto);
      return res.status(201).json({
        statusCode: 201,
        status: "OK",
        message: "The request has succeeded.",
        data: medias
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

  @Delete(':id')
  @ApiOperation({ summary: "Delete menu" })
  @ApiResponse({ status: 403, description: "Request forbidden by administrative rules." })
  @ApiResponse({ status: 201, description: "The request delete has succeeded." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  async remove(@Param('id') id: string, @Response() res: any) {
    try {
      const media = await this.mediasService.remove(id);

      return res.status(201).json({
        statusCode: 201,
        status: "OK",
        message: "The request has succeeded.",
        data: media
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

  
}
