import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { PlaceEntity } from 'src/modules/place/repository/entities/place.entity';
export declare class PlaceRepository extends DatabaseMongoUUIDRepositoryAbstract<PlaceEntity, any> {
    private readonly placeModel;
    constructor(placeModel: Model<PlaceEntity>);
}
