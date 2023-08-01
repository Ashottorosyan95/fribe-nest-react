import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { UserServicesUsageDoc, UserServicesUsageEntity } from '../entities/user-services-usage.entity';
export declare class UserServicesUsageRepository extends DatabaseMongoUUIDRepositoryAbstract<UserServicesUsageEntity, UserServicesUsageDoc> {
    private readonly userServicesUsageModel;
    constructor(userServicesUsageModel: Model<UserServicesUsageEntity>);
}
