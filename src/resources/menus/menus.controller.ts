import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@ApiTags("menus")
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) { }

  @Post()
  @ApiParam({ type: Menu, name: "Menu" })
  @ApiOperation({ summary: "Create new menu" })
  @ApiBody({ type: Menu })
  @ApiResponse({ status: 403, description: "Request forbidden by administrative rules." })
  @ApiResponse({ status: 201, description: "The request created has succeeded." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  async create(@Body() createMenuDto: CreateMenuDto, @Response() res: any): Promise<CreateMenuDto> {
    try {
      const menu = await this.menusService.create(createMenuDto);
      return res.status(201).json({
        statusCode: 201,
        status: "OK",
        message: "The request created has succeeded.",
        data: menu
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
  async findAll(@Response() res: any): Promise<Menu[]> {
    try {
      const menu = await this.menusService.findAll( );
      return res.status(200).json({
        statusCode: 200,
        status: "OK",
        message: "The request has succeeded.",
        data: menu
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
  async findAllActive(@Response() res: any): Promise<Menu[]> {
    try {
      const menu = await this.menusService.findAllActive();
      const menuParsed = menu.filter((item) => item.active === true);
        
      const count = menuParsed?.length || 0;
      return res.status(200).json({
        statusCode: 200,
        status: "OK",
        message: "The request has succeeded.",
        data: menuParsed,
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
      const menu = await this.menusService.findOne(id);
      return res.status(200).json({
        statusCode: 200,
        status: "OK",
        message: "The request has succeeded.",
        data: menu
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
      const menu = await this.menusService.findOneActive(id);
      return res.status(200).json({
        statusCode: 200,
        status: "OK",
        message: "The request has succeeded.",
        data: menu
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
  @ApiParam({ type: Menu, name: "Menu" })
  @ApiOperation({ summary: "Update menu" })
  @ApiBody({ type: Menu })
  @ApiResponse({ status: 403, description: "Request forbidden by administrative rules." })
  @ApiResponse({ status: 201, description: "The request created has succeeded." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto, @Response() res: any) {
    try {
      const menu = await this.menusService.update(id, updateMenuDto);
      return res.status(201).json({
        statusCode: 201,
        status: "OK",
        message: "The request has succeeded.",
        data: menu
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
      const menu = await this.menusService.remove(id);
      return res.status(201).json({
        statusCode: 201,
        status: "OK",
        message: "The request has succeeded.",
        data: menu
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
