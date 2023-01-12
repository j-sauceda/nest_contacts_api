import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  hash: string;

  @ApiProperty({ required: false })
  firstName: string;

  @ApiProperty({ required: false })
  lastName: string;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;
}
