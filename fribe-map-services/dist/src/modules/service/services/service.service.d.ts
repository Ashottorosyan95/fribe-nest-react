import { IDatabaseCreateOptions, IDatabaseFindAllOptions, IDatabaseFindOneOptions, IDatabaseGetTotalOptions, IDatabaseSaveOptions } from 'src/common/database/interfaces/database.interface';
import { ServiceRepository } from 'src/modules/service/repository/repositories/service.repository';
import { IServiceService } from 'src/modules/service/interfaces/service.service.interface';
import { ServiceEntity } from 'src/modules/service/repository/entities/service.entity';
import { ServiceCreateDto } from 'src/modules/service/dtos/service.create.dto';
export declare class ServiceService implements IServiceService {
    private readonly serviceRepository;
    constructor(serviceRepository: ServiceRepository);
    findOneById<T>(_id: string, options?: IDatabaseFindOneOptions<any>): Promise<T>;
    findOne<T>(find: Record<string, any>, options?: IDatabaseFindOneOptions<any>): Promise<T>;
    getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>;
    deleteOneById(_id: string, options?: IDatabaseSaveOptions): Promise<ServiceEntity>;
    deleteOne(find: Record<string, any>, options?: IDatabaseSaveOptions): Promise<ServiceEntity>;
    findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions): Promise<T[]>;
    create(data: ServiceCreateDto, options?: IDatabaseCreateOptions<any>): Promise<ServiceEntity>;
}
