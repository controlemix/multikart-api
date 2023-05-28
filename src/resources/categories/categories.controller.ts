import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { CategoryDto } from "./dto/category.dto";
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

function arrayToCommaString(array) {
  return array
    .filter(element => {
      return element !== null && element !== undefined;
    })
    .join(';');
}

@ApiTags("category")
@Controller("category")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post("/singleCreate")
  async create(@Body() payload: any ): Promise<Category> {
    const size = payload?.size ? Array.isArray(payload?.size) ? arrayToCommaString(payload.size) : payload?.size : "";
    const colors = payload?.colors ? Array.isArray(payload?.colors) ? arrayToCommaString(payload.colors) : payload?.colors : "";
    const tags = payload?.tags ? Array.isArray(payload?.tags) ? arrayToCommaString(payload.tags) : payload?.tags : "";
    const payloadParssed = {...payload, size, colors, tags};
    const createCategoryDto: CreateCategoryDto = payloadParssed;
    return await this.categoriesService.create(createCategoryDto);
  }

  @Post("/bulkCreate")
  async bulkCreate(@Body() payload: any ): Promise<any> {
    if(Array.isArray(payload?.data)){
      const data = Array.isArray(payload?.data) ? payload?.data : [];
      data.forEach( async itemPayload => {
        const size = itemPayload?.size ? Array.isArray(itemPayload?.size) ? arrayToCommaString(itemPayload.size) : itemPayload?.size : "";
        const colors = itemPayload?.colors ? Array.isArray(itemPayload?.colors) ? arrayToCommaString(itemPayload.colors) : itemPayload?.colors : "";
        const tags = itemPayload?.tags ? Array.isArray(itemPayload?.tags) ? arrayToCommaString(itemPayload.tags) : itemPayload?.tags : "";
        const payloadParssed = {...itemPayload, size, colors, tags};
        const createCategoryDto: CreateCategoryDto = payloadParssed;
        await this.categoriesService.create(createCategoryDto);
      }); 
      return "Bulk load performed successfully!"
    }else{
      return "Bulk load performed with failure!"
    }
  }

  @Get("/categoryInfo")
  findAll(): Promise<any[]> {
    return this.categoriesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
