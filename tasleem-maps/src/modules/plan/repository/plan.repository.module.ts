import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    PlanEntity,
    PlanSchema,
} from 'src/modules/plan/repository/entities/plan.entity';
import { PlanRepository } from 'src/modules/plan/repository/repositories/plan.repository';

@Module({
    providers: [PlanRepository],
    exports: [PlanRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: PlanEntity.name,
                    schema: PlanSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class PlanRepositoryModule {}
