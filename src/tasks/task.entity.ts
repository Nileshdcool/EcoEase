import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty()
  id: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  location: string;
}
