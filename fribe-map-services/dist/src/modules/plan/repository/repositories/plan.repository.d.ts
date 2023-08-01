import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { PlanDoc, PlanEntity } from 'src/modules/plan/repository/entities/plan.entity';
export declare class PlanRepository extends DatabaseMongoUUIDRepositoryAbstract<PlanEntity, PlanDoc> {
    private readonly planModel;
    constructor(planModel: Model<PlanEntity>);
}
