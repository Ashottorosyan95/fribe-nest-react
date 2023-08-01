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
exports.PlanSchema = exports.PlanEntity = exports.PlanDatabaseName = void 0;
const openapi = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const database_mongo_uuid_entity_abstract_1 = require("../../../../common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract");
const database_decorator_1 = require("../../../../common/database/decorators/database.decorator");
const service_entity_1 = require("../../../service/repository/entities/service.entity");
const ulid_1 = require("ulid");
const plan_time_window_constant_1 = require("../../constants/plan.time-window.constant");
exports.PlanDatabaseName = 'plans';
let PlanEntity = exports.PlanEntity = class PlanEntity extends database_mongo_uuid_entity_abstract_1.DatabaseMongoUUIDEntityAbstract {
    static _OPENAPI_METADATA_FACTORY() {
        return { shortId: { required: true, type: () => String }, name: { required: true, type: () => String }, services: { required: true, type: () => [String] }, requestLimit: { required: true, type: () => Number }, timeWindow: { required: true, enum: require("../../constants/plan.time-window.constant").ENUM_PLAN_TIME_WINDOW }, price: { required: true, type: () => Number } };
    }
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        maxlength: 50,
        index: true,
    }),
    __metadata("design:type", String)
], PlanEntity.prototype, "shortId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 50,
    }),
    __metadata("design:type", String)
], PlanEntity.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: [],
        _id: false,
        type: (Array),
        ref: service_entity_1.ServiceEntity.name,
    }),
    __metadata("design:type", Array)
], PlanEntity.prototype, "services", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], PlanEntity.prototype, "requestLimit", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        index: true,
        trim: true,
        enum: plan_time_window_constant_1.ENUM_PLAN_TIME_WINDOW,
        type: String,
    }),
    __metadata("design:type", String)
], PlanEntity.prototype, "timeWindow", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], PlanEntity.prototype, "price", void 0);
exports.PlanEntity = PlanEntity = __decorate([
    (0, database_decorator_1.DatabaseEntity)({ collection: exports.PlanDatabaseName })
], PlanEntity);
exports.PlanSchema = mongoose_1.SchemaFactory.createForClass(PlanEntity);
exports.PlanSchema.pre('save', function (next) {
    this.shortId = (0, ulid_1.ulid)();
    next();
});
//# sourceMappingURL=plan.entity.js.map