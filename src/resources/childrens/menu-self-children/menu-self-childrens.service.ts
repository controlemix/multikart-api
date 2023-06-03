import { Injectable, Inject } from '@nestjs/common';
import { MENUS_SELF_CHILDREN_REPOSITORY } from '../../../core/constants';
import { CreateMenuSelfChildrenDto } from './dto/create-menu-self-childrens.dto';
import { MenuSelfChildren } from './entities/menu-self-childrens.entity';
import { MenuChildren } from 'src/resources/menus/entities/menu-children.entity';
import { MenuSelfChildrenDto } from './dto/menu-self-childrens.dto';
import { UpdateMenuSelfChildrenDto } from './dto/update-menu-self-childrens.dto';

@Injectable()
export class MenusSelfChildrensService {
  constructor(@Inject(MENUS_SELF_CHILDREN_REPOSITORY) private menuSelfChildrenRepository: typeof MenuSelfChildren) {}

  async create(createMenuSelfChildrenDto: CreateMenuSelfChildrenDto): Promise<CreateMenuSelfChildrenDto> {
    try {
      const count = await MenuSelfChildren.count();
      const order =
      createMenuSelfChildrenDto?.order && createMenuSelfChildrenDto?.order > 0
          ? createMenuSelfChildrenDto?.order
          : count + 1;
      return await this.menuSelfChildrenRepository.create(
        {...createMenuSelfChildrenDto, order},
        {
          include: [ MenuChildren ]
        }
      );
    } catch (error) {
      throw error;
    }
  }

  // async findOne(id: string): Promise<MenuSelfChildren> {
  //   return await this.menuSelfChildrenRepository.findByPk(id, {include: [{ model: MenuChildren, as: 'children' }]});
  // }

  async findChildrenByParent(id: string): Promise<MenuSelfChildrenDto[]> {

    return await MenuSelfChildren.findAll(
      {
        include: [
          
        { model: MenuChildren, as: 'menuChildren' }    

      
      ],
        where: { 
          childrenParentId: id 
        },
        order: [
          ['order', 'ASC'],
        ],
      }
    );
  }

  async findAll(): Promise<MenuSelfChildren[]> {
    return await this.menuSelfChildrenRepository.findAll(
      {
        // include: [{ model: MenuChildren, as: 'children' }],
        order: [
          ['order', 'ASC'],
        ],
      }
    );
  }

  async update(
    id: string,
    updateMenuChildrenDto: UpdateMenuSelfChildrenDto,
  ): Promise<UpdateMenuSelfChildrenDto> {
    try {
      const menuSelfChildren = await this.menuSelfChildrenRepository.findOne({ where: { id } })
      if (!menuSelfChildren) {
        throw new Error('MenuChildren not found');
      }
      return await menuSelfChildren.update({ ...updateMenuChildrenDto });
    } catch (error) {
      throw error;
    }
  }


  async remove(id: string) {
    try {
      const menuSelfChildren = await this.menuSelfChildrenRepository.findOne({ where: { id } });
      if (!menuSelfChildren) {
        throw new Error('Menu not found');
      }
      return await menuSelfChildren.destroy();
    } catch (error) {
      throw error;
    }
  }
  

  
}
