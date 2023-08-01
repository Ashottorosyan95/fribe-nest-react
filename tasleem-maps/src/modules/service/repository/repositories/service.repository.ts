import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { ServiceDoc, ServiceEntity } from '../entities/service.entity';

@Injectable()
export class ServiceRepository extends DatabaseMongoUUIDRepositoryAbstract<
ServiceEntity,
ServiceDoc
>{
    constructor(
        @DatabaseModel(ServiceEntity.name)
        private readonly serviceModel: Model<ServiceEntity>
    ) {
        super(serviceModel);
    }
}
