import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';

export class PlanGetSerialization extends ResponseIdSerialization {
    @ApiProperty({
        required: true,
    })
    readonly name: string;

    @ApiProperty({
        description: 'List of services',
        isArray: true,
        required: true,
    })
    readonly services: string[];

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
