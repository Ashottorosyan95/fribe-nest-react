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
exports.PlaceSchema = exports.PlaceEntity = exports.PlacesDatabaseName = void 0;
const openapi = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const database_mongo_uuid_entity_abstract_1 = require("../../../../common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract");
const database_decorator_1 = require("../../../../common/database/decorators/database.decorator");
const ulid_1 = require("ulid");
const place_location_serialization_1 = require("../../serializations/place-location.serialization");
exports.PlacesDatabaseName = 'places';
let PlaceEntity = exports.PlaceEntity = class PlaceEntity extends database_mongo_uuid_entity_abstract_1.DatabaseMongoUUIDEntityAbstract {
    static _OPENAPI_METADATA_FACTORY() {
        return { shortId: { required: true, type: () => String }, name: { required: true, type: () => String }, formattedAddress: { required: true, type: () => String }, city: { required: true, type: () => String }, country: { required: true, type: () => String }, category: { required: true, type: () => String }, location: { required: true, type: () => require("../../serializations/place-location.serialization").PlaceLocation }, additionalInfo: { required: true, type: () => Object } };
    }
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        maxlength: 50,
        index: true,
    }),
    __metadata("design:type", String)
], PlaceEntity.prototype, "shortId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 50,
    }),
    __metadata("design:type", String)
], PlaceEntity.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 500,
    }),
    __metadata("design:type", String)
], PlaceEntity.prototype, "formattedAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 50,
    }),
    __metadata("design:type", String)
], PlaceEntity.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 50,
    }),
    __metadata("design:type", String)
], PlaceEntity.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 50,
    }),
    __metadata("design:type", String)
], PlaceEntity.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        _id: false,
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: true,
            default: [0, 0]
        }
    }),
    __metadata("design:type", place_location_serialization_1.PlaceLocation)
], PlaceEntity.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        _id: false,
        type: {},
        default: null
    }),
    __metadata("design:type", Object)
], PlaceEntity.prototype, "additionalInfo", void 0);
exports.PlaceEntity = PlaceEntity = __decorate([
    (0, database_decorator_1.DatabaseEntity)({ collection: exports.PlacesDatabaseName })
], PlaceEntity);
exports.PlaceSchema = mongoose_1.SchemaFactory.createForClass(PlaceEntity);
exports.PlaceSchema.index({ name: 'text', formattedAddress: 'text', city: 'text' });
exports.PlaceSchema.index({ location: "2dsphere" });
exports.PlaceSchema.pre('save', function (next) {
    this.shortId = (0, ulid_1.ulid)();
    next();
});
//# sourceMappingURL=place.entity.js.map