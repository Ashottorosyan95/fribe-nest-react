import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
export declare class PlanGetSerialization extends ResponseIdSerialization {
    readonly name: string;
    readonly services: string[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt?: Date;
}
