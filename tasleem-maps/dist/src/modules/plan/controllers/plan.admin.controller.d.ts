import { IResponse } from 'src/common/response/interfaces/response.interface';
import { PlanCreateDto } from '../dtos/plan.create.dto';
import { PlanService } from '../services/plan.service';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
export declare class PlanAdminController {
    private readonly planService;
    private readonly paginationService;
    constructor(planService: PlanService, paginationService: PaginationService);
    create(body: PlanCreateDto): Promise<IResponse>;
    list(): Promise<IResponse>;
    get(id: string): Promise<IResponse>;
}
