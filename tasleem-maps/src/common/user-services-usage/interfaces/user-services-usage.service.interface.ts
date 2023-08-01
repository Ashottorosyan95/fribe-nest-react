import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { UserServicesUsageDoc, UserServicesUsageEntity } from '../repository/entities/user-services-usage.entity';
import { UserServicesUsageCreateDto } from '../dtos/user-services-usage.create.dto';

export interface IUserServicesUsageService {
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<UserServicesUsageEntity[]>;
    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<UserServicesUsageDoc>;
    findOneByName(
        name: string,
        options?: IDatabaseFindOneOptions
    ): Promise<UserServicesUsageDoc>;
    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number>;
    create(
        { userId, serviceId, serviceType }: UserServicesUsageCreateDto,
        options?: IDatabaseCreateOptions
    ): Promise<UserServicesUsageDoc>;
    delete(
        repository: UserServicesUsageDoc,
        options?: IDatabaseSaveOptions
    ): Promise<UserServicesUsageDoc>;
    deleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean>;
}
