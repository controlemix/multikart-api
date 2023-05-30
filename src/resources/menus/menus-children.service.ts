import { Injectable, Inject } from '@nestjs/common';
import { MENUS_CHILDREN_REPOSITORY } from '../../core/constants';

import { CreateMenuChildrenDto } from './dto/create-menu-children.dto';
import { MenuChildren } from './entities/menu-children.entity';
import { UpdateMenuChildrenDto } from './dto/update-menu-children.dto';

@Injectable()
export class MenusChildrenService {
  constructor(@Inject(MENUS_CHILDREN_REPOSITORY) private menuChildrensRepository: typeof MenuChildren) { }

  async create(createMenuChildrenDto: CreateMenuChildrenDto): Promise<CreateMenuChildrenDto> {
    try {
      const parentId = createMenuChildrenDto.parentId;
      const count = await MenuChildren.count({ where: { parentId: parentId } });
      const order = (createMenuChildrenDto?.order && createMenuChildrenDto?.order > 0) ? createMenuChildrenDto?.order : count + 1;
      return await this.menuChildrensRepository.create({ ...createMenuChildrenDto, order });
    }
    catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<MenuChildren[]> {
    return await this.menuChildrensRepository.findAll(
      {
        order: [
          ['order', 'ASC'],
        ],
      }
    );
  }


  async findOne(id: string): Promise<MenuChildren> {
    return await this.menuChildrensRepository.findByPk(id);
  }

  
  async update(
    id: string,
    updateMenuChildrenDto: UpdateMenuChildrenDto,
  ): Promise<UpdateMenuChildrenDto> {
    try {
      const menuChildren = await this.menuChildrensRepository.findOne({ where: { id } })
      if (!menuChildren) {
        throw new Error('MenuChildren not found');
      }
      return await menuChildren.update({ ...updateMenuChildrenDto });
    } catch (error) {
      throw error;
    }
  }


  async remove(id: string) {
    try {
      const menuChildren = await this.menuChildrensRepository.findOne({ where: { id } });
      if (!menuChildren) {
        throw new Error('Menu not found');
      }
      return await menuChildren.destroy();
    } catch (error) {
      throw error;
    }
  }
}
