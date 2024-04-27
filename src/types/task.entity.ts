import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Status } from '../enums/status.enum';
import {Location} from '../types/location.entity';

export class Task {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNumber()
  workerId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @ValidateNested()
  location: Location;

  @ApiProperty()
  status: Status;
}
