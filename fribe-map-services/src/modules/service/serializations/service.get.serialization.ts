import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import { ENUM_SERVICE } from '../constants/service.enum.constant';

export class ServiceGetSerialization extends ResponseIdSerialization {
    @ApiProperty({
        required: true,
    })
    readonly name: string;


    @ApiProperty({
        required: true,
    })
    readonly description: string;

    @ApiProperty({
        description: 'service type',
        required: true,
        enum: ENUM_SERVICE
    })
    readonly type: ENUM_SERVICE;

    @ApiProperty({
        description: 'Date created at',
        example: faker.date.recent(),
        required: true,
    })
    readonly createdAt: Date;

    @ApiProperty({
        description: 'Date updated at',
        example: faker.date.recent(),
        required: false,
    })
    readonly updatedAt: Date;

    @Exclude()
    readonly deletedAt?: Date;
}
