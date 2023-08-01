import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthJwtAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
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
    PLACE_DEFAULT_AVAILABLE_SEARCH,
    PLACE_DEFAULT_AVAILABLE_SORT,
    PLACE_DEFAULT_PER_PAGE,
    PLACE_DEFAULT_SORT,
} from '../constants/place.list.constants';
import { PlaceFindNearbySearchDoc, PlaceGetDoc } from '../docs/place.doc';
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
import { PlaceListSerialization } from '../serializations/place.list.serialization';
import { classToPlain, instanceToPlain } from 'class-transformer';

@ApiTags('modules.place')
@Controller({
    version: '1',
    path: '/place',
})
export class PlaceController {
    constructor(
        private readonly placeService: PlaceService,
        private readonly paginationService: PaginationService
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
    async findPlaceFromText(
        @PaginationQueryTextSearch() { _search }: TextSearchDto
    ): Promise<IResponse> {
        console.log(_search);

        const find: Record<string, any> = {
            ..._search,
        };

        const result = await this.placeService.findOne(find);

        return result;
    }

    @PlaceFindNearbySearchDoc()
    @Get('/nearbysearch')
    async searchNearByPlaces(
        @Query() query: PlaceNearbySearchDto
    ): Promise<IResponse> {
        console.log(' >>>>>> ', query);

        // first 100
        const result: PlaceEntity[] =
            await this.placeService.searchNearByPlaces(query, {
                paging: {
                    limit: 50,
                    offset: 0,
                },
            });
        return {
            data: result
        };
    }

    /* list */
    // @PlaceGetDoc()
    @Get('/textsearch')
    // @Response('place.list', {
    //     serialization: PlaceListSerialization,
    // })
    async findByTextSearch(
        @PaginationQueryTextSearch() { _search }: TextSearchDto
    ): Promise<any> {
        const find: Record<string, any> = {
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
}
