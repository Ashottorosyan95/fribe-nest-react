import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { UserServicesUsageRepository } from './repositories/user-services-usage.repository';
import { UserServicesUsageEntity, UserServicesUsageSchema } from './entities/user-services-usage.entity';

@Module({
    providers: [UserServicesUsageRepository],
    exports: [UserServicesUsageRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: UserServicesUsageEntity.name,
                    schema: UserServicesUsageSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class UserServicesUsageRepositoryModule { }
