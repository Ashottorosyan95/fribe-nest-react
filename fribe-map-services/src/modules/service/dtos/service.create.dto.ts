import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, MaxLength, IsEnum } from 'class-validator';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';

export class ServiceCreateDto {
    @ApiProperty({
        example: faker.name.firstName(),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @Type(() => String)
    readonly name: string;

    @ApiProperty({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    @Type(() => String)
    readonly description: string;

    @ApiProperty({
        description: 'Service Type',
        required: true,
        type: () => String,
        enum: ENUM_SERVICE,
        enumName: 'ENUM_SERVICE',
    })
    @IsEnum(ENUM_SERVICE)
    @IsNotEmpty()
    type: ENUM_SERVICE;
}
