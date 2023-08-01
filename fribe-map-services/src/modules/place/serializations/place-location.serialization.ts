import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PlaceLocation {
    @Exclude()
    @ApiHideProperty()
    type = 'Point';

    @ApiProperty({
        isArray: true,
        type: 'number'
    })
    @Type(() => Number)
    coordinates: number[];
}
