import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    ServiceEntity,
    ServiceSchema,
} from 'src/modules/service/repository/entities/service.entity';
import { ServiceRepository } from 'src/modules/service/repository/repositories/service.repository';

@Module({
    providers: [ServiceRepository],
    exports: [ServiceRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: ServiceEntity.name,
                    schema: ServiceSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class ServiceRepositoryModule {}
