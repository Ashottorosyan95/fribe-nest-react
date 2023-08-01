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
const place_doc_1 = require("../docs/place.doc");
const place_get_serialization_1 = require("../serializations/place.get.serialization");
const response_decorator_1 = require("../../../common/response/decorators/response.decorator");
const place_service_1 = require("../services/place.service");
const pagination_service_1 = require("../../../common/pagination/services/pagination.service");
const place_nearby_search_dto_1 = require("../dtos/place.nearby.search.dto");
let PlaceController = exports.PlaceController = class PlaceController {
    constructor(placeService, paginationService) {
        this.placeService = placeService;
        this.paginationService = paginationService;
    }
    async findPlaceFromText({ _search }) {
        console.log(_search);
        const find = {
            ..._search,
        };
        const result = await this.placeService.findOne(find);
        return result;
    }
    async searchNearByPlaces(query) {
        console.log(' >>>>>> ', query);
        const result = await this.placeService.searchNearByPlaces(query, {
            paging: {
                limit: 50,
                offset: 0,
            },
        });
        return {
            data: result
        };
    }
    async findByTextSearch({ _search }) {
        const find = {
            ..._search,
        };
        const result = await this.placeService.findAll(find, {
            paging: {
                limit: 10,
                offset: 0,
            },
        });
        console.log(' >>>>>>> result ', result);
        return result;
    }
};
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
], PlaceController.prototype, "findPlaceFromText", null);
__decorate([
    (0, place_doc_1.PlaceFindNearbySearchDoc)(),
    (0, common_1.Get)('/nearbysearch'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [place_nearby_search_dto_1.PlaceNearbySearchDto]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "searchNearByPlaces", null);
__decorate([
    (0, common_1.Get)('/textsearch'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, pagination_decorator_1.PaginationQueryTextSearch)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_list_dto_1.TextSearchDto]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "findByTextSearch", null);
exports.PlaceController = PlaceController = __decorate([
    (0, swagger_1.ApiTags)('modules.place'),
    (0, common_1.Controller)({
        version: '1',
        path: '/place',
    }),
    __metadata("design:paramtypes", [place_service_1.PlaceService,
        pagination_service_1.PaginationService])
], PlaceController);
//# sourceMappingURL=place.controller.js.map