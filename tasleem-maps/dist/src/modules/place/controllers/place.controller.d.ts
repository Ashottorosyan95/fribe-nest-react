import { TextSearchDto } from 'src/common/pagination/dtos/pagination.list.dto';
import { PlaceService } from '../services/place.service';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { PlaceNearbySearchDto } from '../dtos/place.nearby.search.dto';
export declare class PlaceController {
    private readonly placeService;
    private readonly paginationService;
    constructor(placeService: PlaceService, paginationService: PaginationService);
    findPlaceFromText({ _search }: TextSearchDto): Promise<IResponse>;
    searchNearByPlaces(query: PlaceNearbySearchDto): Promise<IResponse>;
    findByTextSearch({ _search }: TextSearchDto): Promise<any>;
}
