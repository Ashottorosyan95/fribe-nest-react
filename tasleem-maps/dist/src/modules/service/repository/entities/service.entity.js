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
exports.ServiceSchema = exports.ServiceEntity = exports.ServiceDatabaseName = void 0;
const openapi = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const database_mongo_uuid_entity_abstract_1 = require("../../../../common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract");
const database_decorator_1 = require("../../../../common/database/decorators/database.decorator");
const service_enum_constant_1 = require("../../constants/service.enum.constant");
const ulid_1 = require("ulid");
exports.ServiceDatabaseName = 'services';
let ServiceEntity = exports.ServiceEntity = class ServiceEntity extends database_mongo_uuid_entity_abstract_1.DatabaseMongoUUIDEntityAbstract {
    static _OPENAPI_METADATA_FACTORY() {
        return { shortId: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, type: { required: true, enum: require("../../constants/service.enum.constant").ENUM_SERVICE } };
    }
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        maxlength: 50,
        index: true,
    }),
    __metadata("design:type", String)
], ServiceEntity.prototype, "shortId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 50,
    }),
    __metadata("design:type", String)
], ServiceEntity.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 250,
    }),
    __metadata("design:type", String)
], ServiceEntity.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        trim: true,
        enum: service_enum_constant_1.ENUM_SERVICE,
        type: String,
    }),
    __metadata("design:type", String)
], ServiceEntity.prototype, "type", void 0);
exports.ServiceEntity = ServiceEntity = __decorate([
    (0, database_decorator_1.DatabaseEntity)({ collection: exports.ServiceDatabaseName })
], ServiceEntity);
exports.ServiceSchema = mongoose_1.SchemaFactory.createForClass(ServiceEntity);
exports.ServiceSchema.pre('save', function (next) {
    this.shortId = (0, ulid_1.ulid)();
    next();
});
//# sourceMappingURL=service.entity.js.map