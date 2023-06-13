import { Injectable, Inject } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from '../../../core/constants';
import { CreateCategoryDto } from '../dto/create-category.dto'
import { UpdateCategoryDto } from '../dto/update-category.dto'
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@Inject(CATEGORY_REPOSITORY) private categoryRepository: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto> {
    try {
      const count = await Category.count();
      const order =
        createCategoryDto?.order && createCategoryDto?.order > 0
          ? createCategoryDto?.order
          : count + 1;
      return await this.categoryRepository.create({ ...createCategoryDto, order });
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<any[]> {
    try {
      const categories = await Category.findAll({ 
        where: {
          isActive: true
        },   
        order: [
          ['order', 'ASC'],
        ],
      });
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async findAllActive(): Promise<Category[]> {
    try {
      return await this.categoryRepository.findAll({
        where: {
          isActive: true
        },  
        order: [
          ['order', 'ASC'],
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Category> {
    try {
      return await this.categoryRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneActive(id: string): Promise<Category> {
    try {
      return await this.categoryRepository.findOne({
        where: {
          id,
          isActive: true
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateCategoryDto> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        throw new Error('category not found');
      }
      return await category.update({ ...updateCategoryDto });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<any> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        throw new Error('category not found');
      }
      return await category.destroy();
    } catch (error) {
      throw error;
    }
  }
}
