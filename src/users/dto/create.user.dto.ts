import { Role } from '../../../generated/prisma/enums';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role = Role.USER;
}