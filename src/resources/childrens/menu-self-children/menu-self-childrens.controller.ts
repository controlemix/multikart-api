import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";
import { MenusSelfChildrensService } from './menu-self-childrens.service';
import { CreateMenuSelfChildrenDto } from './dto/create-menu-self-childrens.dto';
import { MenuSelfChildren } from './entities/menu-self-childrens.entity';


@ApiTags("menu-self-childrens")
@Controller('menu-self-childrens')
export class MenusSelfChildrensController {
  constructor(private readonly menusSelfChildrensService: MenusSelfChildrensService) { }


  @Post()
  @ApiParam({ type: MenuSelfChildren, name: "MenuSelfChildren" })
  @ApiOperation({ summary: "Create new menu" })
  @ApiBody({ type: MenuSelfChildren })
  @ApiResponse({ status: 403, description: "Request forbidden by administrative rules." })
  @ApiResponse({ status: 201, description: "The request created has succeeded." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  @ApiResponse({ status: 500, description: "Internal Server Error" })  
  async create(@Body() createMenuSelfChildrenDto: CreateMenuSelfChildrenDto, @Response() res: any): Promise<CreateMenuSelfChildrenDto> {
    try {
      const menu = await this.menusSelfChildrensService.create(createMenuSelfChildrenDto);
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
  @ApiOperation({ summary: "Get all menu" })
  @ApiResponse({ status: 403, description: "Request forbidden by administrative rules." })
  @ApiResponse({ status: 200, description: "The request has succeeded." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  @ApiResponse({ status: 500, description: "Internal Server Error" })  
  async findAll(@Response() res: any): Promise<any[]> {
    try {
      const menu = await this.menusSelfChildrensService.findAll( );
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
  
}
