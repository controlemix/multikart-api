import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenusChildrenService } from './menus-children.service';
import { CreateMenuChildrenDto } from './dto/create-menu-children.dto';
import { MenuChildren } from './entities/menu-children.entity';
import { UpdateMenuChildrenDto } from './dto/update-menu-children.dto';

@ApiTags("menu-childrens")
@Controller('menu-childrens')
export class MenusChildrenController {
  constructor(private readonly menusChildrenService: MenusChildrenService) { }

  @Post()
  @ApiParam({ type: MenuChildren, name: "MenuChildren" })
  @ApiOperation({ summary: "Create new children" })
  @ApiBody({ type: MenuChildren })
  @ApiResponse({ status: 403, description: "Request forbidden by administrative rules." })
  @ApiResponse({ status: 201, description: "The request created has succeeded." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  async create(@Body() createMenuChildrenDto: CreateMenuChildrenDto, @Response() res: any): Promise<CreateMenuChildrenDto> {
    try {
      const menuChildren = await this.menusChildrenService.create(createMenuChildrenDto);
      return res.status(201).json({
        statusCode: 201,
        status: "OK",
        message: "The request created has succeeded.",
        data: menuChildren
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
  @ApiParam({ type: MenuChildren, name: "MenuChildren" })
  @ApiOperation({ summary: "Create new children" })
  @ApiBody({ type: MenuChildren })
  @ApiResponse({ status: 403, description: "Request forbidden by administrative rules." })
  @ApiResponse({ status: 201, description: "The request created has succeeded." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  async findAll(@Response() res: any): Promise<MenuChildren[]> {
    try {
      const menuChildren = await this.menusChildrenService.findAll();
      return res.status(201).json({
        statusCode: 201,
        status: "OK",
        message: "The request has succeeded.",
        data: menuChildren
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
  findOne(@Param('id') id: string) {
    return this.menusChildrenService.findOne(id);
  }

  @Put(':id')
  @ApiParam({ type: MenuChildren, name: "MenuChildren" })
  @ApiOperation({ summary: "Update menu" })
  @ApiBody({ type: MenuChildren })
  @ApiResponse({ status: 403, description: "Request forbidden by administrative rules." })
  @ApiResponse({ status: 201, description: "The request created has succeeded." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  async update(@Param('id') id: string, @Body() updateMenuChildrenDto: UpdateMenuChildrenDto, @Response() res: any) {
    try {
      const menuChildren = await this.menusChildrenService.update(id, updateMenuChildrenDto);
      return res.status(201).json({
        statusCode: 201,
        status: "OK",
        message: "The request has succeeded.",
        data: menuChildren
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
  @ApiOperation({ summary: "Delete children" })
  @ApiResponse({ status: 403, description: "Request forbidden by administrative rules." })
  @ApiResponse({ status: 201, description: "The request delete has succeeded." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  async remove(@Param('id') id: string, @Response() res: any) {
    try {
      const menuChildren = await this.menusChildrenService.remove(id);
      return res.status(201).json({
        statusCode: 201,
        status: "OK",
        message: "The request has succeeded.",
        data: menuChildren
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
