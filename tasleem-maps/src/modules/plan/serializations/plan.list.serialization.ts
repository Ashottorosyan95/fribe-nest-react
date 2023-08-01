import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { PlanGetSerialization } from './plan.get.serialization';

export class PlanListSerialization extends OmitType(PlanGetSerialization, [
    'services',
] as const) {
    @ApiProperty({
        description: 'Count of services',
        required: true,
    })
    @Transform(({ value }) => value.length)
    readonly servicesCount: number;
}
