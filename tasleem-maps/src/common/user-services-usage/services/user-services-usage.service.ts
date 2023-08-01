import { Injectable } from '@nestjs/common';
import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { UserServicesUsageRepository } from '../repository/repositories/user-services-usage.repository';
import { IUserServicesUsageService } from '../interfaces/user-services-usage.service.interface';
import { UserServicesUsageDoc, UserServicesUsageEntity } from '../repository/entities/user-services-usage.entity';
import { UserServicesUsageCreateDto } from '../dtos/user-services-usage.create.dto';

@Injectable()
export class UserServicesUsageService implements IUserServicesUsageService {

    constructor(
        private readonly userServicesUsageRepository: UserServicesUsageRepository
    ) { }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<UserServicesUsageEntity[]> {
        return this.userServicesUsageRepository.findAll<UserServicesUsageEntity>(find, options);
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<UserServicesUsageDoc> {
        return this.userServicesUsageRepository.findOneById<UserServicesUsageDoc>(_id, options);
    }

    async findOneByName(
        name: string,
        options?: IDatabaseFindOneOptions
    ): Promise<UserServicesUsageDoc> {
        return this.userServicesUsageRepository.findOne<UserServicesUsageDoc>({ name }, options);
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.userServicesUsageRepository.getTotal(find, options);
    }

    async create(
        { userId, serviceId, serviceType }: UserServicesUsageCreateDto,
        options?: IDatabaseCreateOptions
    ): Promise<UserServicesUsageDoc> {
        const create: UserServicesUsageEntity = new UserServicesUsageEntity();
        create.userId = userId;
        create.serviceId = serviceId;
        create.serviceType = serviceType;
        create.createdAt = new Date();
        create.updatedAt = new Date();

        return this.userServicesUsageRepository.create<UserServicesUsageEntity>(create, options);
    }

    async delete(
        repository: UserServicesUsageDoc,
        options?: IDatabaseSaveOptions
    ): Promise<UserServicesUsageDoc> {
        return this.userServicesUsageRepository.softDelete(repository, options);
    }

    async deleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        return this.userServicesUsageRepository.deleteMany(find, options);
    }
}
