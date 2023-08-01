import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";



export class PlaceNearbySearchDto {
    @ApiProperty({
        required: false,
    })
    @IsString()
    @MaxLength(100)
    @Type(() => String)
    readonly name: string;


    @ApiProperty({
        required: false,
        default: 50000
    })
    @IsNumber()
    @Type(() => Number)
    readonly radius: number = 50000;


    @ApiProperty({
        required: true,
        example: '-33.8587323,151.2100055' // long, lat
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    readonly location: string;


}