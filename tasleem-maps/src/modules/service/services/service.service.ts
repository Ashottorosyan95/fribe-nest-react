import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { ServiceRepository } from 'src/modules/service/repository/repositories/service.repository';
import { Injectable } from '@nestjs/common';
import { IServiceService } from 'src/modules/service/interfaces/service.service.interface';
import { ServiceEntity } from 'src/modules/service/repository/entities/service.entity';
import { ServiceCreateDto } from 'src/modules/service/dtos/service.create.dto';

@Injectable()
export class ServiceService implements IServiceService {
    constructor(private readonly serviceRepository: ServiceRepository) { }
    async findOneById<T>(
        _id: string,
        options?: IDatabaseFindOneOptions<any>
    ): Promise<T> {
        return await this.serviceRepository.findOneById<T>(_id, options);
    }

    async findOne<T>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions<any>
    ): Promise<T> {
        return await this.serviceRepository.findOne<T>(find, options);
    }

    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.serviceRepository.getTotal(find, options);
    }
    deleteOneById(
        _id: string,
        options?: IDatabaseSaveOptions
    ): Promise<ServiceEntity> {
        throw new Error('Method not implemented.');
    }
    deleteOne(
        find: Record<string, any>,
        options?: IDatabaseSaveOptions
    ): Promise<ServiceEntity> {
        throw new Error('Method not implemented.');
    }

    async deleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        return this.serviceRepository.deleteMany(find, options);
    }

    async findAll<T>(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<T[]> {
        return this.serviceRepository.findAll<T>(find, options);
    }

    async create(
        data: ServiceCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<ServiceEntity> {
        const create: ServiceEntity = new ServiceEntity();
        create.name = data.name;
        create.description = data.description;
        create.type = data.type;
        return await this.serviceRepository.create<ServiceEntity>(
            create,
            options
        );
    }
}
