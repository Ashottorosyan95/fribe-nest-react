import { Body, Controller, Get, Post, Query, Request, VERSION_NEUTRAL, Param, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    PaginationQuery,
    PaginationQueryFilterContain,
    PaginationQuerySearch,
    PaginationQueryTextSearch,
} from 'src/common/pagination/decorators/pagination.decorator';
import {
    PaginationListDto,
    TextSearchDto,
} from 'src/common/pagination/dtos/pagination.list.dto';
import {
    PLACE_DEFAULT_AVAILABLE_ORDER_BY,
    PLACE_DEFAULT_AVAILABLE_SEARCH,
    PLACE_DEFAULT_AVAILABLE_SORT,
    PLACE_DEFAULT_ORDER_BY,
    PLACE_DEFAULT_ORDER_DIRECTION,
    PLACE_DEFAULT_PER_PAGE,
    PLACE_DEFAULT_SORT,
} from '../constants/place.list.constants';
import { PlaceFindNearbySearchDoc, PlaceGetDoc, TextSearchDoc } from '../docs/place.doc';
import { PlaceGetSerialization } from '../serializations/place.get.serialization';
import {
    Response,
    ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import { PlaceService } from '../services/place.service';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { PlaceNearbySearchDto } from '../dtos/place.nearby.search.dto';
import { PlaceEntity } from '../repository/entities/place.entity';
import { ValidateCredentialsInterceptor } from 'src/common/request/interceptors/request.validate.interceptor';
import { RedisService } from 'src/common/redis/services/redis.service';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';

@ApiTags('modules.place')
@Controller({
    version: VERSION_NEUTRAL,
    path: '/place',
})
export class PlaceController {
    constructor(
        private readonly placeService: PlaceService,
        private readonly paginationService: PaginationService,
        private readonly redisService: RedisService,
    ) {
        //
    }

    /* single */
    @PlaceGetDoc()
    @Response('place.get', {
        serialization: PlaceGetSerialization,
    })
    // @AuthJwtAccessProtected()
    @Get('/findplacefromtext')
    @UseInterceptors(
        new ValidateCredentialsInterceptor(ENUM_SERVICE.PLACES_API_SERVICE)
    )
    async findPlaceFromText(
        @PaginationQueryTextSearch() { _search }: TextSearchDto,
        @Request() req: any
    ): Promise<IResponse> {

        let clientId = req.query.clientId ? req.query.clientId : req.body.clientId

        if (!_search) {
            return { data: {} };
        }

        const find: Record<string, any> = {
            ..._search,
        };


        let data = []
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

        } catch (error) {
            console.log(error)
        }

        this.redisService.decrementServiceUsageCount(clientId, ENUM_SERVICE.PLACES_API_SERVICE)
        // const result = await this.placeService.findOne(find);
        return { data: data };
    }

    @PlaceFindNearbySearchDoc()
    @Get('/nearbysearch')
    @UseInterceptors(
        new ValidateCredentialsInterceptor(ENUM_SERVICE.MAP_API_SERVICE)
    )
    async searchNearByPlaces(
        @PaginationQuery(
            PLACE_DEFAULT_PER_PAGE,
            PLACE_DEFAULT_ORDER_BY,
            PLACE_DEFAULT_ORDER_DIRECTION,
            PLACE_DEFAULT_AVAILABLE_SEARCH,
            PLACE_DEFAULT_AVAILABLE_ORDER_BY
        ) { _limit, _offset, _order }: PaginationListDto,
        @Query() query: PlaceNearbySearchDto,
        @Request() req: any
    ): Promise<IResponse> {

        let clientId = req.query.clientId ? req.query.clientId : req.body.clientId

        // first 20 by default Max 50
        const result: PlaceEntity[] =
            await this.placeService.searchNearByPlaces(query, {
                paging: {
                    limit: _limit,
                    offset: _offset,
                },
                order: _order,
            });

        this.redisService.decrementServiceUsageCount(clientId, ENUM_SERVICE.MAP_API_SERVICE)

        return {
            data: result
        };
    }

    /* list */
    @TextSearchDoc()
    @Get('/textsearch')
    @UseInterceptors(
        new ValidateCredentialsInterceptor(ENUM_SERVICE.PLACES_API_SERVICE)
    )
    // @Response('place.list', {
    //     serialization: PlaceListSerialization,
    // })
    async findByTextSearch(
        @PaginationQuery(
            PLACE_DEFAULT_PER_PAGE,
            PLACE_DEFAULT_ORDER_BY,
            PLACE_DEFAULT_ORDER_DIRECTION,
            PLACE_DEFAULT_AVAILABLE_SEARCH,
            PLACE_DEFAULT_AVAILABLE_ORDER_BY
        ) { _limit, _offset, _order }: PaginationListDto,
        @PaginationQueryTextSearch() { _search }: TextSearchDto,
        @Request() req: any
    ): Promise<any> {

        let clientId = req.query.clientId ? req.query.clientId : req.body.clientId


        if (!_search) {
            return {
                _pagination: { total: 0, totalPage: 0, currentPage: 0 },
                data: []
            };
        }
        console.log(_limit)
        let limit = _limit ? _limit : PLACE_DEFAULT_PER_PAGE
        const find: Record<string, any> = {
            ..._search
        };

        let data = []
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

        } catch (error) {
            console.log(error)
        }
        console.log(' >>>>>>> data ', data.length);
        const total: number = await this.placeService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            limit
        );
        this.redisService.decrementServiceUsageCount(clientId, ENUM_SERVICE.PLACES_API_SERVICE)
        return {
            _pagination: { total, totalPage, currentPage: _offset },
            data
        };
    }
}
