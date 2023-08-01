import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { ServiceDoc, ServiceEntity } from '../entities/service.entity';
export declare class ServiceRepository extends DatabaseMongoUUIDRepositoryAbstract<ServiceEntity, ServiceDoc> {
    private readonly serviceModel;
    constructor(serviceModel: Model<ServiceEntity>);
}
