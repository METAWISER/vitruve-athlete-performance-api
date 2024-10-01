import { IsOptional, IsIn } from 'class-validator';

export class MetricsAggregateDto {
  @IsOptional()
  @IsIn(['speed', 'strength', 'stamina'], {
    message: 'Invalid metricType. Must be one of: speed, strength, stamina',
  })
  metricType?: string;
}
