import { Injectable, Inject } from '@nestjs/common';
import { MENUS_CHILDREN_REPOSITORY } from '../../core/constants';

import { CreateMenuChildrenDto } from './dto/create-menu-children.dto';
import { MenuChildren } from './entities/menu-children.entity';
import { UpdateMenuChildrenDto } from './dto/update-menu-children.dto';
import { MenuSelfChildren } from '../childrens/menu-self-children/entities/menu-self-childrens.entity';
import { MenuSelfChildrenDto } from '../childrens/menu-self-children/dto/menu-self-childrens.dto';
import { MenuChildrenDto } from './dto/menu-children.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenusChildrenService {
  constructor(@Inject(MENUS_CHILDREN_REPOSITORY) private menuChildrensRepository: typeof MenuChildren) { }

  async create(createMenuChildrenDto: CreateMenuChildrenDto): Promise<CreateMenuChildrenDto> {
    try {
      const parentId = createMenuChildrenDto.parentId;
      const count = await MenuChildren.count({ where: { parentId: parentId } });
      const order = (createMenuChildrenDto?.order && createMenuChildrenDto?.order > 0) ? createMenuChildrenDto?.order : count + 1;
      return await this.menuChildrensRepository.create({ ...createMenuChildrenDto, order },


        {
          include: [MenuSelfChildren]
        }
      );
    }
    catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<MenuChildrenDto[]> {
    return await this.menuChildrensRepository.findAll(
      {
        include: [{ model: MenuSelfChildren, as: 'children' },
        { model: Menu, as: 'menu' }

        ],
        order: [
          ['order', 'ASC'],
        ],
      }
    );
  }

  async findChildrenByParent(id: string): Promise<MenuChildrenDto[]> {

    return await MenuChildren.findAll(
      {
        include: [{ model: MenuSelfChildren, as: 'children' },
        { model: Menu, as: 'menu' }


        ],
        where: {
          parentId: id
        },
        order: [
          ['order', 'ASC'],
        ],
      }
    );
  }


  async findOne(id: string): Promise<MenuChildren> {
    return await this.menuChildrensRepository.findByPk(id, { include: [{ model: MenuSelfChildren, as: 'children' }, { model: Menu, as: 'menu' }], });
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

  async updateOrder(
    listUpdateMenuChildren: any[],
  ): Promise<UpdateMenuChildrenDto[]> {
    try {
      const listUpdated = [];
      listUpdateMenuChildren.forEach(async (item: any) => {
        const updateMenuChildrenDto: UpdateMenuChildrenDto = new UpdateMenuChildrenDto({ order: item.order });
        const id = item.id;
        const menuChildren = await this.menuChildrensRepository.findOne({ where: { id } })
        if (!menuChildren) {
          throw new Error('MenuChildren not found');
        }
        await menuChildren.update({ ...updateMenuChildrenDto, order: item.order })
        listUpdated.push(menuChildren);
      });
      return listUpdated;
    } catch (error) {
      throw error;
    }
  }

  // async updateOrder(list: any ): Promise<any> {
  //   try {
  //     const itemsUpdated = [];
  //     list.forEach(async (item: any) => {
  //       const id = item.id;
  //       const order = item.order;
  //       const menuChildren = await this.menuChildrensRepository.findOne({ where: { id } });
  //       if (!menuChildren) {
  //         throw new Error('MenuChildren not found');
  //       }        
  //       const updateResp = await menuChildren.update({ order }, { where: { id } });
  //       itemsUpdated.push(updateResp);
  //     });
  //     return itemsUpdated
  //   } catch (error) {
  //     throw error;
  //   }

  // }


  async remove(id: string): Promise<any> {
    try {
      const menuChildren = await this.menuChildrensRepository.findOne({ where: { id } });

      if (!menuChildren) {
        throw new Error('Menu not found');
      }
      const count = await MenuSelfChildren.count({ where: { childrenParentId: id } });
      if (count > 0) {
        return {
          error: true,
          message: 'MenuChildren has childrens'
        }
      }
      return await menuChildren.destroy();
    } catch (error) {
      throw error;
    }
  }
}
