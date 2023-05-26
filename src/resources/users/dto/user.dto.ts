import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NEUTRAL = 'neutral',
}

export enum Rules {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  CUSTOMER = 'customer',  
}

export interface UserDtoAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  gender: Gender;
  rules: Rules;
  isActive: boolean;
  isValidate: boolean;
  lastAccess: string;
}

export class UserDto  implements UserDtoAttributes {
  id: number;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Gender, {
      message: 'gender must be either male or female',
  })
  readonly gender: Gender;

  @IsNotEmpty()
  @IsEnum(Rules, {
      message: 'rules ACL for permissions',
  })
  readonly rules: Rules;
  
  isActive: boolean;
  isValidate: boolean;
  lastAccess: string;

}
