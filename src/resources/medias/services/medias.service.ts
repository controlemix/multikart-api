import { Injectable, Inject } from '@nestjs/common';
import { MEDIAS_REPOSITORY } from '../../../core/constants';
import { CreateMediasDto } from '../dto/create-medias.dto'
import { UpdateMediasDto } from '../dto/update-medias.dto'
import { Medias } from '../entities/medias.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

@Injectable()
export class MediasService {
  constructor(@Inject(MEDIAS_REPOSITORY) private mediasRepository: typeof Medias) {}
    
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

  async create(createMediasDto: CreateMediasDto): Promise<CreateMediasDto > {
    try {
      const mediasCreate = await this.mediasRepository.create({ ...createMediasDto });
      return mediasCreate;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<any[]> {
    try {
      const categories = await Medias.findAll({ 
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

  async findAllActive(): Promise<Medias[]> {
    try {
      return await this.mediasRepository.findAll({
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

  async findOne(id: string): Promise<Medias> {
    try {
      return  this.mediasRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async findOneActive(id: string): Promise<Medias> {
    try {
      return await this.mediasRepository.findOne({
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
    updateMediasDto: UpdateMediasDto,
  ): Promise<UpdateMediasDto> {
    try {
      const media = await this.mediasRepository.findOne({ where: { id } });
      if (!media) {
        throw new Error('media not found');
      }
      return await media.update({ ...updateMediasDto });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<any> {
    try {
      const media = await this.mediasRepository.findOne({ where: { id } });
      if (!media) {
        throw new Error('media not found');
      }
      return await media.destroy();
    } catch (error) {
      throw error;
    }
  }
}
