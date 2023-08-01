import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { PlaceService } from '../services/place.service';
import { PlaceAddLocationDto } from '../dtos/place.addLocation.dto';
import { PlaceEditLocationDto } from '../dtos/place.editLocation.dto copy';
import { PaginationListDto, TextSearchDto } from 'src/common/pagination/dtos/pagination.list.dto';
import { PlaceNearbySearchDto } from '../dtos/place.nearby.search.dto';
export declare class PlaceAdminController {
    private readonly paginationService;
    private readonly placeService;
    constructor(paginationService: PaginationService, placeService: PlaceService);
    uploadExcelData(file: any): Promise<IResponse>;
    addLocation(body: PlaceAddLocationDto): Promise<any>;
    editLocation(body: PlaceEditLocationDto): Promise<any>;
    getPlaceDataFromLatLong(lat: string, long: string): Promise<any>;
    findPlaceFromText({ _search }: TextSearchDto): Promise<IResponse>;
    searchNearByPlaces({ _limit, _offset, _order }: PaginationListDto, query: PlaceNearbySearchDto): Promise<IResponse>;
    findByTextSearch({ _limit, _offset, _order }: PaginationListDto, { _search }: TextSearchDto): Promise<any>;
}
