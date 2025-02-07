import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SMS_COUNTRY, SMS_PROVIDER } from 'src/common/interfaces';

export class sendSMSDTO {
  @ApiProperty({ isArray: true })
  @IsArray()
  phone: string[];

  @ApiProperty({ enum: SMS_COUNTRY })
  @IsEnum(SMS_COUNTRY)
  country: SMS_COUNTRY;

  @ApiProperty({ enum: SMS_PROVIDER })
  @IsEnum(SMS_PROVIDER)
  provider: SMS_PROVIDER;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sender: string;
}
