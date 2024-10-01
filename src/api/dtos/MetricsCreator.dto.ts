import { IsNotEmpty, IsNumber, IsPositive, IsDate, IsOptional, IsEnum, IsDateString } from 'class-validator';

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
  @IsNotEmpty()
  @IsEnum(MetricTypeEnum, {
    message: 'metricType must be one of: speed, strength, stamina',
  })
  metricType!: MetricTypeEnum;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive({
    message: 'value must be a positive number',
  })
  value!: number;

  @IsEnum(MetricUnitEnum, {
    message: 'unit must be one of: kg, meters/second, seconds',
  })
  unit!: MetricUnitEnum;

  @IsOptional()
  @IsDateString({}, { message: 'startDate must be a valid ISO 8601 date' })
  startDate?: Date;

  @IsOptional()
  @IsDateString({}, { message: 'endDate must be a valid ISO 8601 date' })
  endDate?: Date;
}