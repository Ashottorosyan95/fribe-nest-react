
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { PlanDoc, PlanEntity } from 'src/modules/plan/repository/entities/plan.entity';

@Injectable()
export class PlanRepository extends DatabaseMongoUUIDRepositoryAbstract<
PlanEntity,
PlanDoc
>  {
    constructor(
        @DatabaseModel(PlanEntity.name)
        private readonly planModel: Model<PlanEntity>
    ) {
        super(planModel);
    }
}
