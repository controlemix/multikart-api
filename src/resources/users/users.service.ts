import { Injectable, Inject } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
// import { UserDto } from './dto/user.dto';

import { USERS_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
  constructor(@Inject(USERS_REPOSITORY) private usersRepository: typeof User) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.create({ ...createUserDto });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne<User>({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.usersRepository.findOne<User>({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}