import { Injectable, Inject, ExceptionFilter } from "@nestjs/common";
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CATEGORIES_REPOSITORY } from '../../core/constants';
import { Category } from "./entities/category.entity";

function makeSKU(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}



@Injectable()
export class CategoriesService {
  constructor(@Inject(CATEGORIES_REPOSITORY) private categoriesRepository: typeof Category) { }

  async validateCategory(sku: string) {
    const category = await this.findOneBySku(sku);
    if (!category) {
        return null;
    }
    const {...result } = category['dataValues'];
    return result;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<any> {
    let sku = createCategoryDto?.sku ? createCategoryDto.sku : makeSKU(10).toLocaleUpperCase();
    sku = sku.toString() !== "" ? sku.toString().toLocaleUpperCase() : makeSKU(10).toLocaleUpperCase();
    
    let size = [];
    let colors = [];
    let tags = [];

    const category = await this.validateCategory(sku);
    if (category) {
      sku = makeSKU(10).toLocaleUpperCase();
    }

    if(createCategoryDto?.size?.toString()?.length>0){
      size = createCategoryDto?.size?.toString()?.trim().split(/\s*;\s*/);      
    }

    if(createCategoryDto?.colors?.toString()?.length>0){
      colors = createCategoryDto?.colors?.toString()?.trim().split(/\s*;\s*/);      
    }

    if(createCategoryDto?.tags?.toString()?.length>0){
      tags = createCategoryDto?.tags?.toString()?.trim().split(/\s*;\s*/);      
    }

    const newCategory = await this.categoriesRepository.create({ ...createCategoryDto, sku });
    const parssedCategory = {
      ...newCategory['dataValues'],
      size,
      colors,
      tags
    }
    return parssedCategory
  }

  async findAll(): Promise<any> {
    
    const categories = await this.categoriesRepository.findAll();
    const data = [];
    
    categories.forEach( async itemPayload => {
      let size = [];
      let colors = [];
      let tags = [];

      if(itemPayload['dataValues']?.size?.toString()?.length>0){
        size = itemPayload['dataValues']?.size?.toString()?.trim().split(/\s*;\s*/);      
      }
  
      if(itemPayload['dataValues']?.colors?.toString()?.length>0){
        colors = itemPayload['dataValues']?.colors?.toString()?.trim().split(/\s*;\s*/);      
      }
  
      if(itemPayload['dataValues']?.tags?.toString()?.length>0){
        tags = itemPayload['dataValues']?.tags?.toString()?.trim().split(/\s*;\s*/);      
      }

   
      data.push({...itemPayload['dataValues'], size, colors, tags})
    }); 

    return data
  }

  async findOne(id: string): Promise<Category> {
    return await this.categoriesRepository.findOne({ where: { id } });
  }

  async findOneById(id: string): Promise<Category> {
    return await this.categoriesRepository.findOne<Category>({ where: { id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesRepository.upsert({ ...updateCategoryDto, id });
  }

  async findOneBySku(sku: string): Promise<Category> {
    return await this.categoriesRepository.findOne<Category>({ where: { sku } });
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    await category.destroy();
  }
}
