import { IDatabaseCreateOptions, IDatabaseFindAllOptions, IDatabaseFindOneOptions, IDatabaseGetTotalOptions, IDatabaseSaveOptions } from 'src/common/database/interfaces/database.interface';
import { ServiceEntity } from 'src/modules/service/repository/entities/service.entity';
import { ServiceCreateDto } from 'src/modules/service/dtos/service.create.dto';
export interface IServiceService {
    findAll(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<ServiceEntity[]>;
    findOneById<T>(_id: string, options?: IDatabaseFindOneOptions): Promise<T>;
    findOne<T>(find: Record<string, any>, options?: IDatabaseFindOneOptions): Promise<T>;
    getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>;
    deleteOneById(_id: string, options?: IDatabaseSaveOptions): Promise<ServiceEntity>;
    deleteOne(find: Record<string, any>, options?: IDatabaseSaveOptions): Promise<ServiceEntity>;
    create(data: ServiceCreateDto, options?: IDatabaseCreateOptions): Promise<ServiceEntity>;
}
