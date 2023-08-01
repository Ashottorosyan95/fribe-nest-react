import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { IPlanService } from 'src/modules/plan/interfaces/plan.service.interface';
import { PlanRepository } from 'src/modules/plan/repository/repositories/plan.repository';
import { PlanCreateDto } from '../dtos/plan.create.dto';
import { PlanEntity } from '../repository/entities/plan.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlanService implements IPlanService {
    constructor(private readonly planRepository: PlanRepository) { }
    async findOneById<T>(
        _id: string,
        options?: IDatabaseFindOneOptions<any>
    ): Promise<T> {
        return await this.planRepository.findOneById<T>(_id, options)
    }

    async findOne<T>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions<any>
    ): Promise<T> {
        return await this.planRepository.findOne<T>(find, options)
    }

    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.planRepository.getTotal(find, options);
    }
    deleteOneById(
        _id: string,
        options?: IDatabaseSaveOptions
    ): Promise<PlanEntity> {
        throw new Error('Method not implemented.');
    }
    deleteOne(
        find: Record<string, any>,
        options?: IDatabaseSaveOptions
    ): Promise<PlanEntity> {
        throw new Error('Method not implemented.');
    }

    async findAll<T>(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<T[]> {
        return this.planRepository.findAll<T>(find, options);
    }

    async create(
        data: PlanCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<PlanEntity> {

        const create: PlanEntity = new PlanEntity();
        create.name = data.name;
        create.price = data.price;
        create.services = data.services;
        create.requestLimit = data.requestLimit;
        create.timeWindow = data.timeWindow;

        return await this.planRepository.create<PlanEntity>(create, options);
    }
}
