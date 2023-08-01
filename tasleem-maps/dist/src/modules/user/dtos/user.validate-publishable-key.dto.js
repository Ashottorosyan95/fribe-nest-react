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
exports.UserValidatePublishableKeyDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const service_enum_constant_1 = require("../../service/constants/service.enum.constant");
const ulid_1 = require("ulid");
class UserValidatePublishableKeyDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { publishableKey: { required: true, type: () => String }, serviceType: { required: true, enum: require("../../service/constants/service.enum.constant").ENUM_SERVICE } };
    }
}
exports.UserValidatePublishableKeyDto = UserValidatePublishableKeyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: (0, ulid_1.ulid)(),
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserValidatePublishableKeyDto.prototype, "publishableKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: service_enum_constant_1.ENUM_SERVICE.PLACES_API_SERVICE,
        required: true,
    }),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserValidatePublishableKeyDto.prototype, "serviceType", void 0);
//# sourceMappingURL=user.validate-publishable-key.dto.js.map