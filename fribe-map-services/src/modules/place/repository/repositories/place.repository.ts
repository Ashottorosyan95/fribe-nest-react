import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { PlaceEntity } from 'src/modules/place/repository/entities/place.entity';

@Injectable()
export class PlaceRepository  extends DatabaseMongoUUIDRepositoryAbstract<
PlaceEntity,
any
> {
    constructor(
        @DatabaseModel(PlaceEntity.name)
        private readonly placeModel: Model<PlaceEntity>
    ) {
        super(placeModel);
    }
}
