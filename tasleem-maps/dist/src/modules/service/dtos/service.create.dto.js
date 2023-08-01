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
exports.ServiceCreateDto = void 0;
const openapi = require("@nestjs/swagger");
const faker_1 = require("@faker-js/faker");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const service_enum_constant_1 = require("../constants/service.enum.constant");
class ServiceCreateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, maxLength: 100 }, description: { required: true, type: () => String, maxLength: 250 }, type: { required: true, enum: require("../constants/service.enum.constant").ENUM_SERVICE } };
    }
}
exports.ServiceCreateDto = ServiceCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: faker_1.faker.name.firstName(),
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ServiceCreateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(250),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ServiceCreateDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Service Type',
        required: true,
        type: () => String,
        enum: service_enum_constant_1.ENUM_SERVICE,
        enumName: 'ENUM_SERVICE',
    }),
    (0, class_validator_1.IsEnum)(service_enum_constant_1.ENUM_SERVICE),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ServiceCreateDto.prototype, "type", void 0);
//# sourceMappingURL=service.create.dto.js.map