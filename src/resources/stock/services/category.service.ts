import { Injectable, Inject } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from '../../../core/constants';
import { CreateCategoryDto } from '../dto/create-category.dto'
import { UpdateCategoryDto } from '../dto/update-category.dto'
import { Category } from '../entities/category.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

@Injectable()
export class CategoryService {
  constructor(@Inject(CATEGORY_REPOSITORY) private categoryRepository: typeof Category) {}
    
  async generateToken(payload: any): Promise<string> {
    try {
      const tokenDefinitions =  new JwtService(JwtModule
        .register({ 
          secret: 'secretKey', 
          signOptions: { expiresIn: '60s' } 
        }))
        .sign(
          { ...payload  }, 
          { expiresIn: '60s', secret: 'secretKey' }
        );
      
      return tokenDefinitions;
    } catch (error) {
      throw error;
    }
  }
    
  async decodeToken(token: string): Promise<any> {
    try {
      const tokenDecode =  new JwtService(JwtModule
        .register({ 
          secret: 'secretKey', 
          signOptions: { expiresIn: '60s' } 
        }))
        .decode(token, { complete: true });
      
      return tokenDecode;
    } catch (error) {
      throw error;
    }
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto > {
    try {
      const count = await Category.count();
      const order =
        createCategoryDto?.order && createCategoryDto?.order > 0
          ? createCategoryDto?.order
          : count + 1;
      const categoryCreate = await this.categoryRepository.create({ ...createCategoryDto, order });
      const payload = { storeItemId: categoryCreate.id, storeItem: 'category', shopId: 1, clientId: 1 };
      const tokenStoreItem: string = await this.generateToken(payload);
      const tokenDecode = await this.decodeToken(tokenStoreItem);
      // console.log('tokenDecode', tokenDecode);
      
      const category: CreateCategoryDto = { 
        id: categoryCreate.dataValues.id,
        title: categoryCreate.dataValues.title,         
        description: categoryCreate.dataValues.description,
        isActive: categoryCreate.dataValues.isActive,
        order: categoryCreate.dataValues.order,
        ranking: categoryCreate.dataValues.ranking,
        shortDescription: categoryCreate.dataValues.shortDescription,
        tags: categoryCreate.dataValues.tags,
        createdAt: categoryCreate.dataValues.createdAt,
        updatedAt: categoryCreate.dataValues.updatedAt,        
        tokenStoreItem
      };
      return category;
    } catch (error) {
      throw error;
    }
  }

  async findAll(req?: any): Promise<any[]> {
    try {
      if(req ) {
        console.log('----------- ------------------');
        const tokenDecode = await this.decodeToken(req.headers['authorization-app']);
        console.log('tokenDecode --------', tokenDecode.payload);
        console.log('----------- ------------------');
        
      }
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
