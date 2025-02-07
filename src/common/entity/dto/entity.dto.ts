import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumberString, IsString } from 'class-validator';

export class EntityReferenceDto {
  @Expose()
  @IsString()
  public reference: string;
}

export class EntityIDDto {
  @Expose()
  @IsNumberString()
  public id: number;
}

export class EntityCodeDto {
  @Expose()
  @IsString()
  public code: string;
}

export class EntityTokenDto {
  @ApiProperty({})
  @Expose()
  @IsString()
  public token: string;
}
