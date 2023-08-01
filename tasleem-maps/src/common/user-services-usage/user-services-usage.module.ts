import { Global, Module } from '@nestjs/common';
import { UserServicesUsageService } from './services/user-services-usage.service';
import { UserServicesUsageRepositoryModule } from './repository/user-services-usage.repository.module';
import { UserServicesUsageAdminController } from './controllers/user-services-usage.admin.controller';

@Global()
@Module({
    imports: [UserServicesUsageRepositoryModule],
    exports: [UserServicesUsageService],
    providers: [UserServicesUsageService],
    controllers: [UserServicesUsageAdminController],
})
export class UserServicesUsageModule { }
