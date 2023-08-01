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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServicesUsageAdminController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_services_usage_service_1 = require("../services/user-services-usage.service");
const error_status_code_constant_1 = require("../../error/constants/error.status-code.constant");
const user_services_usage_create_dto_1 = require("../dtos/user-services-usage.create.dto");
const user_services_usage_admin_doc_1 = require("../docs/user-services-usage.admin.doc");
const response_id_serialization_1 = require("../../response/serializations/response.id.serialization");
const response_decorator_1 = require("../../response/decorators/response.decorator");
let UserServicesUsageAdminController = exports.UserServicesUsageAdminController = class UserServicesUsageAdminController {
    constructor(userServicesUsageService) {
        this.userServicesUsageService = userServicesUsageService;
    }
    async create(body) {
        try {
            const create = await this.userServicesUsageService.create(body);
            return {
                data: {
                    _id: create._id,
                }
            };
        }
        catch (err) {
            console.log(err);
            throw new common_1.InternalServerErrorException({
                statusCode: error_status_code_constant_1.ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }
    }
};
__decorate([
    (0, user_services_usage_admin_doc_1.UserServicesUsageCreateDoc)(),
    (0, response_decorator_1.Response)('user-services-usage.create', {
        serialization: response_id_serialization_1.ResponseIdSerialization,
    }),
    (0, common_1.Post)('/create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_services_usage_create_dto_1.UserServicesUsageCreateDto]),
    __metadata("design:returntype", Promise)
], UserServicesUsageAdminController.prototype, "create", null);
exports.UserServicesUsageAdminController = UserServicesUsageAdminController = __decorate([
    (0, swagger_1.ApiTags)('common.admin.user-services-usage'),
    (0, common_1.Controller)({
        version: '1',
        path: '/user-services-usage',
    }),
    __metadata("design:paramtypes", [user_services_usage_service_1.UserServicesUsageService])
], UserServicesUsageAdminController);
//# sourceMappingURL=user-services-usage.admin.controller.js.map