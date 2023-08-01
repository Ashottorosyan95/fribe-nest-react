import { Module } from '@nestjs/common';
import { ServiceRepositoryModule } from './repository/service.repository.module';
import { ServiceService } from './services/service.service';

@Module({
    imports: [ServiceRepositoryModule],
    exports: [ServiceService],
    providers: [ServiceService],
    controllers: [],
})
export class ServiceModule {}
