import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";

import { CategoryDto } from "./dto/category.dto";
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';


@ApiTags("categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiParam({
    type: Category,
    description: "The create category",
    name: "active",
    example: 1,
    required: true,
    
  })

  @ApiOperation({ summary: "Create category" })
  @ApiResponse({ status: 403, description: "Forbidden request forbidden by administrative rules."  })
  @ApiResponse({ status: 201, description: "Created success the request has succeeded." })
  @ApiResponse({ status: 404, description: "The requested resource is not found." })
  @ApiResponse({ status: 401, description: "Unauthorized access is denied due to invalid credentials." })
  
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(): Promise<Category[]> {
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


// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { CategoriesService } from './categories.service';
// import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';

// @Controller('categories')
// export class CategoriesController {
//   constructor(private readonly categoriesService: CategoriesService) {}

//   @Post()
//   create(@Body() createCategoryDto: CreateCategoryDto) {
//     return this.categoriesService.create(createCategoryDto);
//   }

//   @Get()
//   findAll() {
//     return this.categoriesService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.categoriesService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
//     return this.categoriesService.update(+id, updateCategoryDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.categoriesService.remove(+id);
//   }
// }
