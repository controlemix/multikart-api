import { Injectable, Inject } from "@nestjs/common";
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CATEGORIES_REPOSITORY } from '../../core/constants';
import { Category } from "./entities/category.entity";

@Injectable()
export class CategoriesService {
  constructor(@Inject(CATEGORIES_REPOSITORY) private categoriesRepository: typeof Category) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesRepository.create({ ...createCategoryDto });
  }

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
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

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    await category.destroy();
  }
}
