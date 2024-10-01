import { IsString, IsNotEmpty, IsNumber, IsPositive, IsDate, IsOptional } from 'class-validator';

export enum MetricTypeEnum {
  SPEED = 'speed',
  STRENGTH = 'strength',
  STAMINA = 'stamina',
}

export enum MetricUnitEnum {
  KG = 'kg',
  METERS_PER_SECOND = 'meters/second',
  SECONDS = 'seconds',
}
export class MetricsCreatorDto {
  @IsString()
  @IsNotEmpty()
  metricType!: MetricTypeEnum;

  @IsNumber()
  @IsPositive()
  value!: number;

  @IsString()
  @IsNotEmpty()
  unit!: MetricUnitEnum;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;
}
