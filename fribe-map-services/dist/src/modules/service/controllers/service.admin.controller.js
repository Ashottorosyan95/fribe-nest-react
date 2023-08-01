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
exports.ServiceAdminController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_id_serialization_1 = require("../../../common/response/serializations/response.id.serialization");
const auth_jwt_decorator_1 = require("../../../common/auth/decorators/auth.jwt.decorator");
const service_create_dto_1 = require("../dtos/service.create.dto");
const response_decorator_1 = require("../../../common/response/decorators/response.decorator");
const service_service_1 = require("../services/service.service");
const error_status_code_constant_1 = require("../../../common/error/constants/error.status-code.constant");
const pagination_service_1 = require("../../../common/pagination/services/pagination.service");
const service_get_serialization_1 = require("../serializations/service.get.serialization");
const service_admin_doc_1 = require("../docs/service.admin.doc");
let ServiceAdminController = exports.ServiceAdminController = class ServiceAdminController {
    constructor(serviceService, paginationService) {
        this.serviceService = serviceService;
        this.paginationService = paginationService;
    }
    async create(body) {
        try {
            const reocrdExist = await this.serviceService.findOne({
                name: body.name.toLowerCase(),
            });
            if (reocrdExist) {
                throw new common_1.ConflictException({
                    statusCode: error_status_code_constant_1.ENUM_ERROR_STATUS_CODE_ERROR.ERROR_RECORD_ALREADY_EXIST,
                    message: 'service.error.usernameExist',
                });
            }
            const create = await this.serviceService.create(body);
            return {
                data: { _id: create._id, }
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
    async get(id) {
        return await this.serviceService.findOneById(id);
    }
};
__decorate([
    (0, service_admin_doc_1.ServiceCreateDoc)(),
    (0, response_decorator_1.Response)('service.create', {
        serialization: response_id_serialization_1.ResponseIdSerialization,
    }),
    (0, auth_jwt_decorator_1.AuthJwtAdminAccessProtected)(),
    (0, common_1.Post)('/create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [service_create_dto_1.ServiceCreateDto]),
    __metadata("design:returntype", Promise)
], ServiceAdminController.prototype, "create", null);
__decorate([
    (0, service_admin_doc_1.ServiceGetDoc)(),
    (0, response_decorator_1.Response)('service.get', {
        serialization: service_get_serialization_1.ServiceGetSerialization,
    }),
    (0, auth_jwt_decorator_1.AuthJwtAdminAccessProtected)(),
    (0, common_1.Get)('get/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceAdminController.prototype, "get", null);
exports.ServiceAdminController = ServiceAdminController = __decorate([
    (0, swagger_1.ApiTags)('modules.admin.service'),
    (0, common_1.Controller)({
        version: '1',
        path: '/services',
    }),
    __metadata("design:paramtypes", [service_service_1.ServiceService,
        pagination_service_1.PaginationService])
], ServiceAdminController);
//# sourceMappingURL=service.admin.controller.js.map