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
exports.PlaceGetSerialization = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const response_id_serialization_1 = require("../../../common/response/serializations/response.id.serialization");
const place_location_serialization_1 = require("./place-location.serialization");
class PlaceGetSerialization extends response_id_serialization_1.ResponseIdSerialization {
    get lng() {
        return this.location.coordinates ? this.location.coordinates[0] : null;
    }
    get lat() {
        return this.location.coordinates ? this.location.coordinates[1] : null;
    }
}
exports.PlaceGetSerialization = PlaceGetSerialization;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    __metadata("design:type", String)
], PlaceGetSerialization.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    __metadata("design:type", String)
], PlaceGetSerialization.prototype, "formattedAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    __metadata("design:type", String)
], PlaceGetSerialization.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    __metadata("design:type", String)
], PlaceGetSerialization.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: place_location_serialization_1.PlaceLocation
    }),
    (0, class_transformer_1.Type)(() => place_location_serialization_1.PlaceLocation),
    __metadata("design:type", place_location_serialization_1.PlaceLocation)
], PlaceGetSerialization.prototype, "location", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], PlaceGetSerialization.prototype, "lng", null);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], PlaceGetSerialization.prototype, "lat", null);
//# sourceMappingURL=place.get.serialization.js.map