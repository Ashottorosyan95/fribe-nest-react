import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';
import { ulid } from 'ulid';

export class UserValidatePublishableKeyDto {
  @ApiProperty({
    example: ulid(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly publishableKey: string;

  @ApiProperty({
    example: ENUM_SERVICE.PLACES_API_SERVICE,
    required: true,
  })
  @ApiProperty()
  @IsNotEmpty()
  readonly serviceType: ENUM_SERVICE;
}
