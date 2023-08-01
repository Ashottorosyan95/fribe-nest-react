import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    IsEnum,
    IsUUID,
} from 'class-validator';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';

export class PlanCreateDto {

    @ApiProperty({
        example: faker.name.firstName(),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @Type(() => String)
    readonly name: string;

    // @ApiProperty({
    //     description: 'Plan Services',
    //     required: true,
    //     isArray: true,
    //     type: () => [String],
    //     enum: ENUM_SERVICE,
    //     enumName: 'ENUM_SERVICE',
    // })
    // @IsNotEmpty()
    // services: ENUM_SERVICE[];


    @ApiProperty({
        description: 'Plan Services',
        required: true,
        isArray: true,
        type: () => [String],
    })
    @IsNotEmpty()
    services: string[];
}
