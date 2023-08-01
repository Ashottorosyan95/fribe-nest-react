import { IResponse } from 'src/common/response/interfaces/response.interface';
import { ServiceCreateDto } from 'src/modules/service/dtos/service.create.dto';
import { ServiceService } from 'src/modules/service/services/service.service';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
export declare class ServiceAdminController {
    private readonly serviceService;
    private readonly paginationService;
    constructor(serviceService: ServiceService, paginationService: PaginationService);
    create(body: ServiceCreateDto): Promise<IResponse>;
    get(id: string): Promise<IResponse>;
}
