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
exports.ResponseApiKeysSerialization = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class ResponseApiKeysSerialization {
}
exports.ResponseApiKeysSerialization = ResponseApiKeysSerialization;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Secret key',
        example: 'f68b69b3551ca21aa9d1cd9ddb8c35f9db226e7c3845afba99c6e64f7e24a257',
        required: true,
    }),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ResponseApiKeysSerialization.prototype, "secretKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Publishable key',
        example: '01H4QE1FC3AMWC7ES3J52WD49G',
        required: true,
    }),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ResponseApiKeysSerialization.prototype, "publishableKey", void 0);
//# sourceMappingURL=response.api.serialization.js.map