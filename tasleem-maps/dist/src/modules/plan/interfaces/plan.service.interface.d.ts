import { IDatabaseCreateOptions, IDatabaseFindAllOptions, IDatabaseFindOneOptions, IDatabaseGetTotalOptions, IDatabaseSaveOptions } from 'src/common/database/interfaces/database.interface';
import { PlanEntity } from 'src/modules/plan/repository/entities/plan.entity';
import { PlanCreateDto } from 'src/modules/plan/dtos/plan.create.dto';
export interface IPlanService {
    findAll(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<PlanEntity[]>;
    findOneById<T>(_id: string, options?: IDatabaseFindOneOptions): Promise<T>;
    findOne<T>(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<T>;
    getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>;
    deleteOneById(_id: string, options?: IDatabaseSaveOptions): Promise<PlanEntity>;
    deleteOne(find: Record<string, any>, options?: IDatabaseSaveOptions): Promise<PlanEntity>;
    create(data: PlanCreateDto, options?: IDatabaseCreateOptions): Promise<PlanEntity>;
}
