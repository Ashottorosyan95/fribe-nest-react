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
exports.PlaceAddLocationDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PlaceAddLocationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, maxLength: 100 }, formattedAddress: { required: true, type: () => String, maxLength: 500 }, country: { required: true, type: () => String, maxLength: 50 }, latitude: { required: true, type: () => String, maxLength: 50 }, longitude: { required: true, type: () => String, maxLength: 50 }, city: { required: true, type: () => String }, category: { required: true, type: () => String } };
    }
}
exports.PlaceAddLocationDto = PlaceAddLocationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PlaceAddLocationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(500),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PlaceAddLocationDto.prototype, "formattedAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PlaceAddLocationDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PlaceAddLocationDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PlaceAddLocationDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PlaceAddLocationDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PlaceAddLocationDto.prototype, "category", void 0);
//# sourceMappingURL=place.addLocation.dto.js.map