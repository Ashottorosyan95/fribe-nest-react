import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import { ENUM_SERVICE } from '../constants/service.enum.constant';
export declare class ServiceGetSerialization extends ResponseIdSerialization {
    readonly name: string;
    readonly description: string;
    readonly type: ENUM_SERVICE;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt?: Date;
}
