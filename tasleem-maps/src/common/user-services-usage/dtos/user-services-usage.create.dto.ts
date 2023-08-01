import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { SafeString } from 'src/common/request/validations/request.safe-string.validation';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';

export class UserServicesUsageCreateDto {
    @IsString()
    @IsNotEmpty()
    @SafeString()
    @Type(() => String)
    readonly userId: string;

    @IsString()
    @IsNotEmpty()
    @SafeString()
    @Type(() => String)
    readonly serviceId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Service type of user services usage',
        example: 'PLACES_API_SERVICE',
        required: true,
        enum: ENUM_SERVICE,
    })
    readonly serviceType: ENUM_SERVICE;
}
