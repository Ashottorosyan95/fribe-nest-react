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
const place_addLocation_dto_1 = require("../dtos/place.addLocation.dto");
const error_status_code_constant_1 = require("../../../common/error/constants/error.status-code.constant");
const place_editLocation_dto_copy_1 = require("../dtos/place.editLocation.dto copy");
const place_get_serialization_1 = require("../serializations/place.get.serialization");
const pagination_decorator_1 = require("../../../common/pagination/decorators/pagination.decorator");
const pagination_list_dto_1 = require("../../../common/pagination/dtos/pagination.list.dto");
const response_decorator_1 = require("../../../common/response/decorators/response.decorator");
const place_list_constants_1 = require("../constants/place.list.constants");
const place_nearby_search_dto_1 = require("../dtos/place.nearby.search.dto");
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
            let response = await this.placeService.addPlacesData(records);
            return {
                data: response,
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
    async addLocation(body) {
        try {
            let result = await this.placeService.addPlace(body);
            return result;
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
    async editLocation(body) {
        try {
            let result = await this.placeService.editPlace(body);
            return result;
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
    async getPlaceDataFromLatLong(lat, long) {
        try {
            const placeData = await this.placeService.findOne({ "location.coordinates": [Number(lat), Number(long)] });
            console.log(placeData);
            return {
                data: placeData,
            };
            ;
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
    async findPlaceFromText({ _search }) {
        if (!_search) {
            return { data: {} };
        }
        const find = {
            ..._search,
        };
        let data = [];
        try {
            data = await this.placeService.aggregate([
                { "$match": find },
                {
                    $addFields: {
                        longitude: { $arrayElemAt: ["$location.coordinates", 0] },
                        latitude: { $arrayElemAt: ["$location.coordinates", 1] }
                    }
                },
                { $project: { "name": 1, "_id": 1, "shortId": 1, "country": 1, "city": 1, "formattedAddress": 1, "latitude": 1, "longitude": 1 } },
                { $limit: 1 }
            ]);
        }
        catch (error) {
            console.log(error);
        }
        return { data: data };
    }
    async searchNearByPlaces({ _limit, _offset, _order }, query) {
        console.log(' >>>>>> ', query);
        const result = await this.placeService.searchNearByPlaces(query, {
            paging: {
                limit: _limit,
                offset: _offset,
            },
            order: _order,
        });
        return {
            data: result
        };
    }
    async findByTextSearch({ _limit, _offset, _order }, { _search }) {
        if (!_search) {
            return {
                _pagination: { total: 0, totalPage: 0, currentPage: 0 },
                data: []
            };
        }
        const find = {
            ..._search,
        };
        let limit = _limit ? _limit : place_list_constants_1.PLACE_DEFAULT_PER_PAGE;
        let data = [];
        try {
            data = await this.placeService.aggregate([
                { "$match": find },
                {
                    $addFields: {
                        longitude: { $arrayElemAt: ["$location.coordinates", 0] },
                        latitude: { $arrayElemAt: ["$location.coordinates", 1] },
                    }
                },
                { $project: { "name": 1, "_id": 1, "shortId": 1, "country": 1, "city": 1, "formattedAddress": 1, "latitude": 1, "longitude": 1 } },
                { $limit: limit },
                { "$skip": _offset }
            ]);
        }
        catch (error) {
            console.log(error);
        }
        const total = await this.placeService.getTotal(find);
        const totalPage = this.paginationService.totalPage(total, _limit);
        return {
            _pagination: { total, totalPage, currentPage: _offset },
            data
        };
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
__decorate([
    (0, place_doc_1.AddLocation)(),
    (0, common_1.Post)('/'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [place_addLocation_dto_1.PlaceAddLocationDto]),
    __metadata("design:returntype", Promise)
], PlaceAdminController.prototype, "addLocation", null);
__decorate([
    (0, place_doc_1.AddLocation)(),
    (0, common_1.Put)('/'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [place_editLocation_dto_copy_1.PlaceEditLocationDto]),
    __metadata("design:returntype", Promise)
], PlaceAdminController.prototype, "editLocation", null);
__decorate([
    (0, place_doc_1.GetLocationWithLatLongDoc)(),
    (0, common_1.Get)('/'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)('lat')),
    __param(1, (0, common_1.Query)('long')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PlaceAdminController.prototype, "getPlaceDataFromLatLong", null);
__decorate([
    (0, place_doc_1.PlaceGetDoc)(),
    (0, response_decorator_1.Response)('place.get', {
        serialization: place_get_serialization_1.PlaceGetSerialization,
    }),
    (0, common_1.Get)('/findplacefromtext'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, pagination_decorator_1.PaginationQueryTextSearch)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_list_dto_1.TextSearchDto]),
    __metadata("design:returntype", Promise)
], PlaceAdminController.prototype, "findPlaceFromText", null);
__decorate([
    (0, place_doc_1.PlaceFindNearbySearchDoc)(),
    (0, common_1.Get)('/nearbysearch'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, pagination_decorator_1.PaginationQuery)(place_list_constants_1.PLACE_DEFAULT_PER_PAGE, place_list_constants_1.PLACE_DEFAULT_ORDER_BY, place_list_constants_1.PLACE_DEFAULT_ORDER_DIRECTION, place_list_constants_1.PLACE_DEFAULT_AVAILABLE_SEARCH, place_list_constants_1.PLACE_DEFAULT_AVAILABLE_ORDER_BY)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_list_dto_1.PaginationListDto,
        place_nearby_search_dto_1.PlaceNearbySearchDto]),
    __metadata("design:returntype", Promise)
], PlaceAdminController.prototype, "searchNearByPlaces", null);
__decorate([
    (0, place_doc_1.TextSearchDoc)(),
    (0, common_1.Get)('/textsearch'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, pagination_decorator_1.PaginationQuery)(place_list_constants_1.PLACE_DEFAULT_PER_PAGE, place_list_constants_1.PLACE_DEFAULT_ORDER_BY, place_list_constants_1.PLACE_DEFAULT_ORDER_DIRECTION, place_list_constants_1.PLACE_DEFAULT_AVAILABLE_SEARCH, place_list_constants_1.PLACE_DEFAULT_AVAILABLE_ORDER_BY)),
    __param(1, (0, pagination_decorator_1.PaginationQueryTextSearch)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_list_dto_1.PaginationListDto,
        pagination_list_dto_1.TextSearchDto]),
    __metadata("design:returntype", Promise)
], PlaceAdminController.prototype, "findByTextSearch", null);
exports.PlaceAdminController = PlaceAdminController = __decorate([
    (0, swagger_1.ApiTags)('modules.admin.place'),
    (0, common_1.Controller)({
        version: common_1.VERSION_NEUTRAL,
        path: '/place',
    }),
    __metadata("design:paramtypes", [pagination_service_1.PaginationService,
        place_service_1.PlaceService])
], PlaceAdminController);
//# sourceMappingURL=place.admin.controller.js.map