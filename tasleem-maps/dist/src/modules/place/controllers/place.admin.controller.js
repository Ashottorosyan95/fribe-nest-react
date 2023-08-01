"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceAdminController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pagination_service_1 = require("../../../common/pagination/services/pagination.service");
const place_service_1 = require("../services/place.service");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
const platform_express_1 = require("@nestjs/platform-express");
const XLSX = __importStar(require("xlsx"));
const place_doc_1 = require("../docs/place.doc");
const error_status_code_constant_1 = require("../../../common/error/constants/error.status-code.constant");
let PlaceAdminController = exports.PlaceAdminController = class PlaceAdminController {
    constructor(paginationService, placeService) {
        this.paginationService = paginationService;
        this.placeService = placeService;
    }
    async uploadExcelData(file) {
        try {
            const workbook = XLSX.readFile(file.path);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const records = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            records.shift();
            await this.placeService.addPlacesData(records);
            return {
                data: { messgae: 'Data uploaded successfully' },
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException({
                statusCode: error_status_code_constant_1.ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                _error: error.message,
            });
        }
    }
};
__decorate([
    (0, place_doc_1.UploadPlaceDataDoc)(),
    (0, common_1.Post)('/uploadexcel-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const fileName = (0, uuid_1.v4)() + path.extname(file.originalname);
                cb(null, fileName);
            },
        }),
        limits: {
            fileSize: 1024 * 1024 * 50,
        },
    })),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlaceAdminController.prototype, "uploadExcelData", null);
exports.PlaceAdminController = PlaceAdminController = __decorate([
    (0, swagger_1.ApiTags)('modules.admin.place'),
    (0, common_1.Controller)({
        version: '1',
        path: '/place',
    }),
    __metadata("design:paramtypes", [pagination_service_1.PaginationService,
        place_service_1.PlaceService])
], PlaceAdminController);
//# sourceMappingURL=place.admin.controller.js.map