import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import { PlaceLocation } from './place-location.serialization';
export declare class PlaceGetSerialization extends ResponseIdSerialization {
    readonly name: string;
    readonly formattedAddress: string;
    readonly city: string;
    readonly country: string;
    readonly location: PlaceLocation;
    get lng(): number | null;
    get lat(): number | null;
}
