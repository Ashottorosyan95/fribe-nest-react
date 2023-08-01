"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServicesUsageSchema = exports.UserServicesUsageEntity = exports.UserServicesUsageDatabaseName = void 0;
const openapi = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const database_mongo_uuid_entity_abstract_1 = require("../../../database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract");
const database_decorator_1 = require("../../../database/decorators/database.decorator");
const service_enum_constant_1 = require("../../../../modules/service/constants/service.enum.constant");
exports.UserServicesUsageDatabaseName = 'user_services_usage';
let UserServicesUsageEntity = exports.UserServicesUsageEntity = class UserServicesUsageEntity extends database_mongo_uuid_entity_abstract_1.DatabaseMongoUUIDEntityAbstract {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String }, serviceId: { required: true, type: () => String }, serviceType: { required: true, enum: require("../../../../modules/service/constants/service.enum.constant").ENUM_SERVICE }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: String,
    }),
    __metadata("design:type", String)
], UserServicesUsageEntity.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], UserServicesUsageEntity.prototype, "serviceId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
        enum: service_enum_constant_1.ENUM_SERVICE,
    }),
    __metadata("design:type", String)
], UserServicesUsageEntity.prototype, "serviceType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        type: Date,
    }),
    __metadata("design:type", Date)
], UserServicesUsageEntity.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Date,
    }),
    __metadata("design:type", Date)
], UserServicesUsageEntity.prototype, "updatedAt", void 0);
exports.UserServicesUsageEntity = UserServicesUsageEntity = __decorate([
    (0, database_decorator_1.DatabaseEntity)({ collection: exports.UserServicesUsageDatabaseName })
], UserServicesUsageEntity);
exports.UserServicesUsageSchema = mongoose_1.SchemaFactory.createForClass(UserServicesUsageEntity);
//# sourceMappingURL=user-services-usage.entity.js.map