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
exports.PlaceController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pagination_decorator_1 = require("../../../common/pagination/decorators/pagination.decorator");
const pagination_list_dto_1 = require("../../../common/pagination/dtos/pagination.list.dto");
const place_list_constants_1 = require("../constants/place.list.constants");
const place_doc_1 = require("../docs/place.doc");
const place_get_serialization_1 = require("../serializations/place.get.serialization");
const response_decorator_1 = require("../../../common/response/decorators/response.decorator");
const place_service_1 = require("../services/place.service");
const pagination_service_1 = require("../../../common/pagination/services/pagination.service");
const place_nearby_search_dto_1 = require("../dtos/place.nearby.search.dto");
const request_validate_interceptor_1 = require("../../../common/request/interceptors/request.validate.interceptor");
const redis_service_1 = require("../../../common/redis/services/redis.service");
const service_enum_constant_1 = require("../../service/constants/service.enum.constant");
let PlaceController = exports.PlaceController = class PlaceController {
    constructor(placeService, paginationService, redisService) {
        this.placeService = placeService;
        this.paginationService = paginationService;
        this.redisService = redisService;
    }
    async findPlaceFromText({ _search }, req) {
        let clientId = req.query.clientId ? req.query.clientId : req.body.clientId;
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
        this.redisService.decrementServiceUsageCount(clientId, service_enum_constant_1.ENUM_SERVICE.PLACES_API_SERVICE);
        return { data: data };
    }
    async searchNearByPlaces({ _limit, _offset, _order }, query, req) {
        let clientId = req.query.clientId ? req.query.clientId : req.body.clientId;
        const result = await this.placeService.searchNearByPlaces(query, {
            paging: {
                limit: _limit,
                offset: _offset,
            },
            order: _order,
        });
        this.redisService.decrementServiceUsageCount(clientId, service_enum_constant_1.ENUM_SERVICE.MAP_API_SERVICE);
        return {
            data: result
        };
    }
    async findByTextSearch({ _limit, _offset, _order }, { _search }, req) {
        let clientId = req.query.clientId ? req.query.clientId : req.body.clientId;
        if (!_search) {
            return {
                _pagination: { total: 0, totalPage: 0, currentPage: 0 },
                data: []
            };
        }
        console.log(_limit);
        let limit = _limit ? _limit : place_list_constants_1.PLACE_DEFAULT_PER_PAGE;
        const find = {
            ..._search
        };
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
        console.log(' >>>>>>> data ', data.length);
        const total = await this.placeService.getTotal(find);
        const totalPage = this.paginationService.totalPage(total, limit);
        this.redisService.decrementServiceUsageCount(clientId, service_enum_constant_1.ENUM_SERVICE.PLACES_API_SERVICE);
        return {
            _pagination: { total, totalPage, currentPage: _offset },
            data
        };
    }
};
__decorate([
    (0, place_doc_1.PlaceGetDoc)(),
    (0, response_decorator_1.Response)('place.get', {
        serialization: place_get_serialization_1.PlaceGetSerialization,
    }),
    (0, common_1.Get)('/findplacefromtext'),
    (0, common_1.UseInterceptors)(new request_validate_interceptor_1.ValidateCredentialsInterceptor(service_enum_constant_1.ENUM_SERVICE.PLACES_API_SERVICE)),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, pagination_decorator_1.PaginationQueryTextSearch)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_list_dto_1.TextSearchDto, Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "findPlaceFromText", null);
__decorate([
    (0, place_doc_1.PlaceFindNearbySearchDoc)(),
    (0, common_1.Get)('/nearbysearch'),
    (0, common_1.UseInterceptors)(new request_validate_interceptor_1.ValidateCredentialsInterceptor(service_enum_constant_1.ENUM_SERVICE.MAP_API_SERVICE)),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, pagination_decorator_1.PaginationQuery)(place_list_constants_1.PLACE_DEFAULT_PER_PAGE, place_list_constants_1.PLACE_DEFAULT_ORDER_BY, place_list_constants_1.PLACE_DEFAULT_ORDER_DIRECTION, place_list_constants_1.PLACE_DEFAULT_AVAILABLE_SEARCH, place_list_constants_1.PLACE_DEFAULT_AVAILABLE_ORDER_BY)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_list_dto_1.PaginationListDto,
        place_nearby_search_dto_1.PlaceNearbySearchDto, Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "searchNearByPlaces", null);
__decorate([
    (0, place_doc_1.TextSearchDoc)(),
    (0, common_1.Get)('/textsearch'),
    (0, common_1.UseInterceptors)(new request_validate_interceptor_1.ValidateCredentialsInterceptor(service_enum_constant_1.ENUM_SERVICE.PLACES_API_SERVICE)),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, pagination_decorator_1.PaginationQuery)(place_list_constants_1.PLACE_DEFAULT_PER_PAGE, place_list_constants_1.PLACE_DEFAULT_ORDER_BY, place_list_constants_1.PLACE_DEFAULT_ORDER_DIRECTION, place_list_constants_1.PLACE_DEFAULT_AVAILABLE_SEARCH, place_list_constants_1.PLACE_DEFAULT_AVAILABLE_ORDER_BY)),
    __param(1, (0, pagination_decorator_1.PaginationQueryTextSearch)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_list_dto_1.PaginationListDto,
        pagination_list_dto_1.TextSearchDto, Object]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "findByTextSearch", null);
exports.PlaceController = PlaceController = __decorate([
    (0, swagger_1.ApiTags)('modules.place'),
    (0, common_1.Controller)({
        version: common_1.VERSION_NEUTRAL,
        path: '/place',
    }),
    __metadata("design:paramtypes", [place_service_1.PlaceService,
        pagination_service_1.PaginationService,
        redis_service_1.RedisService])
], PlaceController);
//# sourceMappingURL=place.controller.js.map