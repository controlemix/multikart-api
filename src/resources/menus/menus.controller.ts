import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu, MenuChildren } from './entities/menu.entity';

@ApiTags("menu")
@Controller('menu')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @ApiParam({
    type: Menu,
    description: "The create menu",
    name: "active",
    example: 1,
    required: true,
  })

  @ApiOperation({ summary: "Create menu" })
  create(@Body() createMenuDto: CreateMenuDto): Promise<CreateMenuDto> {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  findAll(): Promise<Menu[]> {
    return this.menusService.findAll();
  }  

  @Post("/children")
  createChildren(@Body() createMenuDto: CreateMenuDto): Promise<CreateMenuDto> {
    return this.menusService.createChildren(createMenuDto);
  }

  @Get("/children")
  findChildrenAll(): Promise<MenuChildren[]> {
    return this.menusService.findChildrenAll();
  }  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }
  
  @Get('/children/:id')
  findChildrenOne(@Param('id') id: string) {
    return this.menusService.findChildrenOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }
}
