import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import { PlaceLocation } from './place-location.serialization';

export class PlaceGetSerialization extends ResponseIdSerialization {
    @ApiProperty({
        required: true,
    })
    readonly name: string;

    @ApiProperty({
        required: true,
    })
    readonly formattedAddress: string;

    @ApiProperty({
        required: false,
    })
    readonly city: string;

    @ApiProperty({
        required: false,
    })
    readonly country: string;


    @ApiProperty({
        required: false,
        type: PlaceLocation
    })
    @Type(() => PlaceLocation)
    readonly location: PlaceLocation;



    @Expose()
    @ApiProperty({
        required: false,
    })
    @Type(() => Number)
    get lng(): number | null {
        return this.location.coordinates ? this.location.coordinates[0] : null;
    }


    @Expose()
    @ApiProperty({
        required: false,
    })
    @Type(() => Number)
    get lat(): number | null {
        return this.location.coordinates ? this.location.coordinates[1] : null;
    }

}
