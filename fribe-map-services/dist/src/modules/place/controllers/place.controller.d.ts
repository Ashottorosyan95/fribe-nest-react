import { PaginationListDto, TextSearchDto } from 'src/common/pagination/dtos/pagination.list.dto';
import { PlaceService } from '../services/place.service';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { PlaceNearbySearchDto } from '../dtos/place.nearby.search.dto';
import { RedisService } from 'src/common/redis/services/redis.service';
export declare class PlaceController {
    private readonly placeService;
    private readonly paginationService;
    private readonly redisService;
    constructor(placeService: PlaceService, paginationService: PaginationService, redisService: RedisService);
    findPlaceFromText({ _search }: TextSearchDto, req: any): Promise<IResponse>;
    searchNearByPlaces({ _limit, _offset, _order }: PaginationListDto, query: PlaceNearbySearchDto, req: any): Promise<IResponse>;
    findByTextSearch({ _limit, _offset, _order }: PaginationListDto, { _search }: TextSearchDto, req: any): Promise<any>;
}
