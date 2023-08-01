import { PlaceLocation } from '../serializations/place-location.serialization';
export declare class PlaceCreateDto {
    readonly name: string;
    readonly formattedAddress: string;
    readonly city: string;
    readonly country: string;
    readonly location: PlaceLocation;
    readonly shortId?: string;
}
