import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { UserServicesUsageDoc, UserServicesUsageEntity } from '../entities/user-services-usage.entity';

@Injectable()
export class UserServicesUsageRepository extends DatabaseMongoUUIDRepositoryAbstract<
    UserServicesUsageEntity,
    UserServicesUsageDoc
> {
    constructor(
        @DatabaseModel(UserServicesUsageEntity.name)
        private readonly userServicesUsageModel: Model<UserServicesUsageEntity>
    ) {
        super(userServicesUsageModel);
    }
}
