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
/// <reference types="mongoose/types/inferschematype" />
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { Document } from 'mongoose';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';
export declare const UserServicesUsageDatabaseName = "user_services_usage";
export declare class UserServicesUsageEntity extends DatabaseMongoUUIDEntityAbstract {
    userId: string;
    serviceId: string;
    serviceType: ENUM_SERVICE;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserServicesUsageSchema: import("mongoose").Schema<UserServicesUsageEntity, import("mongoose").Model<UserServicesUsageEntity, any, any, any, Document<unknown, any, UserServicesUsageEntity> & Omit<UserServicesUsageEntity & Required<{
    _id: string;
}>, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserServicesUsageEntity, Document<unknown, {}, import("mongoose").FlatRecord<UserServicesUsageEntity>> & Omit<import("mongoose").FlatRecord<UserServicesUsageEntity> & Required<{
    _id: string;
}>, never>>;
export type UserServicesUsageDoc = UserServicesUsageEntity & Document;
