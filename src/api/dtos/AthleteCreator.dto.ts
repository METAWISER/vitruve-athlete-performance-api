import { IsString, IsNotEmpty, IsInt, Min, MinLength, IsPositive, IsEmail } from 'class-validator';

export class AthleteCreatorDto {

  @IsString()
  @MinLength(2)
  name!: string;

  @IsInt()
  @IsPositive()
  @Min(15)
  age!: number;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  team!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
