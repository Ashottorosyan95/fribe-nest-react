import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber } from 'class-validator';
import { PlaceLocation } from '../serializations/place-location.serialization';

export class PlaceCreateDto {
    @ApiProperty({
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
    @MaxLength(500)
    @Type(() => String)
    readonly formattedAddress: string;



    @ApiProperty({
        required: false,
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(50)
    @Type(() => String)
    readonly city: string;


    @ApiProperty({
        required: false,
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(50)
    @Type(() => String)
    readonly country: string;


    // @ApiProperty({
    //     required: false,
    // })
    // @IsNumber()
    // @IsNotEmpty()
    // @IsOptional()
    // @Type(() => Number)
    // readonly latitude: number;


    // @ApiProperty({
    //     required: false,
    // })
    // @IsNumber()
    // @IsNotEmpty()
    // @IsOptional()
    // @Type(() => Number)
    // readonly longitude: number;


    @IsNotEmpty()
    @IsOptional()
    readonly location : PlaceLocation

    @Type(() => String)
    readonly shortId? : string
}
