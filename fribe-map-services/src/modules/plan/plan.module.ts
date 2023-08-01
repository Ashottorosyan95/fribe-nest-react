import { Module } from '@nestjs/common';
import { PlanRepositoryModule } from './repository/plan.repository.module';
import { PlanService } from './services/plan.service';

@Module({
    imports: [
        PlanRepositoryModule
    ],
    exports: [PlanService],
    providers: [PlanService],
    controllers: [],
})
export class PlanModule {}
