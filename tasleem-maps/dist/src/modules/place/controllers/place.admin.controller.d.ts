import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { PlaceService } from '../services/place.service';
export declare class PlaceAdminController {
    private readonly paginationService;
    private readonly placeService;
    constructor(paginationService: PaginationService, placeService: PlaceService);
    uploadExcelData(file: any): Promise<IResponse>;
}
