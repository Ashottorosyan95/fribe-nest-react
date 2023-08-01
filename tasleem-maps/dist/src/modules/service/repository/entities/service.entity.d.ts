/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';
export declare const ServiceDatabaseName = "services";
export declare class ServiceEntity extends DatabaseMongoUUIDEntityAbstract {
    shortId: string;
    name: string;
    description: string;
    type: ENUM_SERVICE;
}
export declare const ServiceSchema: import("mongoose").Schema<ServiceEntity, import("mongoose").Model<ServiceEntity, any, any, any, import("mongoose").Document<unknown, any, ServiceEntity> & Omit<ServiceEntity & Required<{
    _id: string;
}>, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ServiceEntity, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ServiceEntity>> & Omit<import("mongoose").FlatRecord<ServiceEntity> & Required<{
    _id: string;
}>, never>>;
export type ServiceDoc = ServiceEntity & Document;
