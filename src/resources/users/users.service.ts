import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import firebase from 'firebase/app';
import 'firebase/auth';
import admin from 'firebase-admin';
// import { UserDto } from './dto/user.dto';

import { USERS_REPOSITORY } from '../../core/constants';
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DB_URL,
  FIREBASE_MSG_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from '../../core/constants/firebase';

@Injectable()
export class UsersService {
  constructor(@Inject(USERS_REPOSITORY) private usersRepository: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const firebaseConfig = {
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      databaseURL: FIREBASE_DB_URL,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_MSG_SENDER_ID,
      appId: FIREBASE_APP_ID,
    };

    admin.initializeApp(firebaseConfig);

    // const userResponse = await admin.auth().createUser({
    //   email: createUserDto.email,
    //   password: createUserDto.password,
    //   emailVerified: false,
    //   disabled: false
    // })

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
