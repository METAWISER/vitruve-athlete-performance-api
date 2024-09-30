import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class MetricsCreatorDto {
  @IsString()
  @IsNotEmpty()
  metricType!: string;

  @IsNumber()
  @IsPositive()
  value!: number;

  @IsString()
  @IsNotEmpty()
  unit!: string;

}
