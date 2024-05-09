import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({ example: 1 })
  userId: number;
  @ApiProperty({ example: 'token' })
  tokenableType: string;
  @ApiProperty({ example: 'name' })
  name: string;
  @ApiProperty({ example: 'deviceModel' })
  deviceModel?: string;
  @ApiProperty({ example: 'deviceOs' })
  deviceOs?: string;
  @ApiProperty({ example: 'deviceOsVersion' })
  deviceOsVersion?: string;
  @ApiProperty({ example: 'appVersion' })
  appVersion?: string;
}
