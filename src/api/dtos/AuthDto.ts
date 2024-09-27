import { IsEmail, IsNotEmpty, Min, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}