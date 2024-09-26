import { IsString, IsInt, IsEmail, IsOptional, Min, MinLength, IsPositive } from 'class-validator';

export class AthleteUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(15)
  age?: number;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  team?: string;
}
