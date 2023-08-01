import { IDatabaseCreateOptions, IDatabaseFindAllOptions, IDatabaseFindOneOptions, IDatabaseGetTotalOptions, IDatabaseSaveOptions } from 'src/common/database/interfaces/database.interface';
import { IPlanService } from 'src/modules/plan/interfaces/plan.service.interface';
import { PlanRepository } from 'src/modules/plan/repository/repositories/plan.repository';
import { PlanCreateDto } from '../dtos/plan.create.dto';
import { PlanEntity } from '../repository/entities/plan.entity';
export declare class PlanService implements IPlanService {
    private readonly planRepository;
    constructor(planRepository: PlanRepository);
    findOneById<T>(_id: string, options?: IDatabaseFindOneOptions<any>): Promise<T>;
    findOne<T>(find: Record<string, any>, options?: IDatabaseFindOneOptions<any>): Promise<T>;
    getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>;
    deleteOneById(_id: string, options?: IDatabaseSaveOptions): Promise<PlanEntity>;
    deleteOne(find: Record<string, any>, options?: IDatabaseSaveOptions): Promise<PlanEntity>;
    findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>;
    create(data: PlanCreateDto, options?: IDatabaseCreateOptions<any>): Promise<PlanEntity>;
}
