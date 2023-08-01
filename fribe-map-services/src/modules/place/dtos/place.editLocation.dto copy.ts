import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber } from 'class-validator';

export class PlaceEditLocationDto {
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
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(50)
    @Type(() => String)
    readonly country: string;

    @ApiProperty({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(50)
    @Type(() => String)
    readonly latitude: string;

    @ApiProperty({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(50)
    @Type(() => String)
    readonly longitude: string;

    @ApiProperty({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(50)
    @Type(() => String)
    readonly shortId: string;


    @ApiProperty({
        required: false,
    })
    @IsNotEmpty()
    @IsOptional()
    readonly additionalInfo: Object
}
