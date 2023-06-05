import { Injectable, Inject } from '@nestjs/common';
import { MENUS_REPOSITORY } from '../../core/constants';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { MenuChildren } from './entities/menu-children.entity';
import { MenuSelfChildren } from '../childrens/menu-self-children/entities/menu-self-childrens.entity';

@Injectable()
export class MenusService {
  constructor(
    @Inject(MENUS_REPOSITORY) private menusRepository: typeof Menu,
    
    ) {}

  async create(createMenuDto: CreateMenuDto): Promise<CreateMenuDto> {
    try {
      const count = await Menu.count();
      const order =
        createMenuDto?.order && createMenuDto?.order > 0
          ? createMenuDto?.order
          : count + 1;
      return await this.menusRepository.create({ ...createMenuDto, order });
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<any[]> {
    try {

      const menus = await Menu.findAll({ 
        // where: {
        //   active: true
        // },   
        order: [
          ['order', 'ASC'],
        ],
      });

      const menusWidthChildren: any[] =  await Promise.all(menus.map(async (menu) => {
        const children = await MenuChildren.findAll(
          {
            include: [{ model: MenuSelfChildren, as: 'children' }],
            where: { 
              parentId: menu.id,
              active: true
            },
            order: [
              ['order', 'ASC'],
            ],
          }
        
          )
        return { ...menu.toJSON(), children };
      }));

      return menusWidthChildren;




      // return await this.menusRepository.findAll({
      //   include: [
      //     { model: MenuChildren, as: 'children' },
      //   ],
      //   order: [
      //     [{ model: MenuChildren, as: 'children' }, 'order', 'ASC'],
      //     ['order', 'ASC'],
      //   ],
      // });
    } catch (error) {
      throw error;
    }
  }

  async findAllActive(): Promise<Menu[]> {
    try {
      return await this.menusRepository.findAll({
        // where: [
        //   // { '$Menu.active$': true },
        //   { '$children.active$': true },
        // ],
        include: [
          {
            model: MenuChildren,
            as: 'children', 
            // where: { '$children.active$': true },
          },
        ],
        order: [
          ['order', 'ASC'],
          [{ model: MenuChildren, as: 'children' }, 'order', 'ASC'],
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Menu> {
    try {
      return await this.menusRepository.findByPk(id, {
        include: [{ model: MenuChildren, as: 'children' }],
        order: [
          [{ model: MenuChildren, as: 'children' }, 'order', 'ASC'],
          ['order', 'ASC'],
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneActive(id: string): Promise<Menu> {
    try {
      return await this.menusRepository.findByPk(id, {
        include: [
          { model: MenuChildren, as: 'children', where: { active: true } },
        ],
        order: [
          [{ model: MenuChildren, as: 'children' }, 'order', 'ASC'],
          ['order', 'ASC'],
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateMenuDto: UpdateMenuDto,
  ): Promise<UpdateMenuDto> {
    try {
      const menu = await this.menusRepository.findByPk(id);
      if (!menu) {
        throw new Error('Menu not found');
      }
      return await menu.update({ ...updateMenuDto });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<any> {
    try {
      const menu = await this.menusRepository.findByPk(id);
      if (!menu) {
        throw new Error('Menu not found');
      }
      const count = await MenuChildren.count({ where: { parentId: id } });
      if (count > 0) {
        return {
          error: true,
          message: 'Menu has childrens'          
        }
      }
      return await menu.destroy();
    } catch (error) {
      throw error;
    }
  }
}
