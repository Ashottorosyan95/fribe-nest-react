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
import { ENUM_PLAN_TIME_WINDOW } from '../../constants/plan.time-window.constant';
export declare const PlanDatabaseName = "plans";
export declare class PlanEntity extends DatabaseMongoUUIDEntityAbstract {
    shortId: string;
    name: string;
    price: number;
    services: string[];
    requestLimit: number;
    timeWindow: ENUM_PLAN_TIME_WINDOW;
}
export declare const PlanSchema: import("mongoose").Schema<PlanEntity, import("mongoose").Model<PlanEntity, any, any, any, import("mongoose").Document<unknown, any, PlanEntity> & Omit<PlanEntity & Required<{
    _id: string;
}>, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PlanEntity, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PlanEntity>> & Omit<import("mongoose").FlatRecord<PlanEntity> & Required<{
    _id: string;
}>, never>>;
export type PlanDoc = PlanEntity & Document;
