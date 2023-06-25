import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto'
import { UpdateCategoryDto } from '../dto/update-category.dto'
import { Category } from '../entities/category.entity';
import {
  AuthenticatedUser,
  Public,
  Roles,
  RoleMatchingMode,
  Resource,
} from 'nest-keycloak-connect';

@ApiTags("category")
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @ApiParam({ type: Category, name: "Category" })
  @ApiOperation({ summary: "Create new Category" })
  @ApiBody({ type: Category })
  @ApiResponse({ status: 403, description: "Request forbidden by administrative rules." })
  @ApiResponse({ status: 201, description: "The request created has succeeded." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  async create(@Body() createCategoryDto: CreateCategoryDto, @Response() res: any): Promise<CreateCategoryDto> {
    try {
      const category = await this.categoryService.create(createCategoryDto);
      return res.status(201).json({
        statusCode: 201,
        status: "OK",
        message: "The request created has succeeded.",
        data: category
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

  // @Public(false)
  // @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
  @Get()
  async findAll(@Response() res: any): Promise<Category[]> {
    try {
      const category = await this.categoryService.findAll( );
      return res.status(200).json({
        statusCode: 200,
        status: "OK",
        message: "The request has succeeded.",
        data: category
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
  async findAllActive(@Response() res: any): Promise<Category[]> {
    try {
      const category = await this.categoryService.findAllActive();
      const categoryParsed = category.filter((item) => item.active === true);
        
      const count = categoryParsed?.length || 0;
      return res.status(200).json({
        statusCode: 200,
        status: "OK",
        message: "The request has succeeded.",
        data: categoryParsed,
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

  // @Roles({ roles: ['realm:basic'] })
  @Get(':id')
  async findOne(@Param('id') id: string, @Response() res: any) {
    try {
      const category = await this.categoryService.findOne(id);
      return res.status(200).json({
        statusCode: 200,
        status: "OK",
        message: "The request has succeeded.",
        data: category
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
      const category = await this.categoryService.findOneActive(id);
      return res.status(200).json({
        statusCode: 200,
        status: "OK",
        message: "The request has succeeded.",
        data: category
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
  @ApiParam({ type: Category, name: "Category" })
  @ApiOperation({ summary: "Update Category" })
  @ApiBody({ type: Category })
  @ApiResponse({ status: 403, description: "Request forbidden by administrative rules." })
  @ApiResponse({ status: 201, description: "The request created has succeeded." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Response() res: any) {
    try {
      const category = await this.categoryService.update(id, updateCategoryDto);
      return res.status(201).json({
        statusCode: 201,
        status: "OK",
        message: "The request has succeeded.",
        data: category
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
      const category = await this.categoryService.remove(id);

      return res.status(201).json({
        statusCode: 201,
        status: "OK",
        message: "The request has succeeded.",
        data: category
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
