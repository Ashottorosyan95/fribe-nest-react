import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    PlaceEntity,
    PlaceSchema,
} from 'src/modules/place/repository/entities/place.entity';
import { PlaceRepository } from 'src/modules/place/repository/repositories/place.repository';

@Module({
    providers: [PlaceRepository],
    exports: [PlaceRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: PlaceEntity.name,
                    schema: PlaceSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class PlaceRepositoryModule {}
