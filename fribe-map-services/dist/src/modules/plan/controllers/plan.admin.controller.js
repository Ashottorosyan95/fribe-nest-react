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
exports.PlanAdminController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_id_serialization_1 = require("../../../common/response/serializations/response.id.serialization");
const plan_admin_doc_1 = require("../docs/plan.admin.doc");
const auth_jwt_decorator_1 = require("../../../common/auth/decorators/auth.jwt.decorator");
const plan_create_dto_1 = require("../dtos/plan.create.dto");
const response_decorator_1 = require("../../../common/response/decorators/response.decorator");
const plan_service_1 = require("../services/plan.service");
const plan_status_code_constant_1 = require("../constants/plan.status-code.constant");
const error_status_code_constant_1 = require("../../../common/error/constants/error.status-code.constant");
const pagination_service_1 = require("../../../common/pagination/services/pagination.service");
const plan_get_serialization_1 = require("../serializations/plan.get.serialization");
let PlanAdminController = exports.PlanAdminController = class PlanAdminController {
    constructor(planService, paginationService) {
        this.planService = planService;
        this.paginationService = paginationService;
    }
    async create(body) {
        try {
            const planExist = await this.planService.findOne({
                name: body.name.toLowerCase(),
            });
            if (planExist) {
                throw new common_1.ConflictException({
                    statusCode: plan_status_code_constant_1.ENUM_PLAN_STATUS_CODE_ERROR.PLAN_NAME_EXISTS_ERROR,
                    message: 'plan.error.usernameExist',
                });
            }
            const create = await this.planService.create(body);
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
    async get(id) {
        return await this.planService.findOneById(id);
    }
};
__decorate([
    (0, plan_admin_doc_1.PlanCreateDoc)(),
    (0, response_decorator_1.Response)('plan.create', {
        serialization: response_id_serialization_1.ResponseIdSerialization,
    }),
    (0, auth_jwt_decorator_1.AuthJwtAdminAccessProtected)(),
    (0, common_1.Post)('/create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_create_dto_1.PlanCreateDto]),
    __metadata("design:returntype", Promise)
], PlanAdminController.prototype, "create", null);
__decorate([
    (0, plan_admin_doc_1.PlaGetDoc)(),
    (0, response_decorator_1.Response)('plan.get', {
        serialization: plan_get_serialization_1.PlanGetSerialization,
    }),
    (0, auth_jwt_decorator_1.AuthJwtAdminAccessProtected)(),
    (0, common_1.Get)('get/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanAdminController.prototype, "get", null);
exports.PlanAdminController = PlanAdminController = __decorate([
    (0, swagger_1.ApiTags)('modules.admin.plan'),
    (0, common_1.Controller)({
        version: '1',
        path: '/plans',
    }),
    __metadata("design:paramtypes", [plan_service_1.PlanService,
        pagination_service_1.PaginationService])
], PlanAdminController);
//# sourceMappingURL=plan.admin.controller.js.map