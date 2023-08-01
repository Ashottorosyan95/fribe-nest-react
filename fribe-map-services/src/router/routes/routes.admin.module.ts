import { Module } from '@nestjs/common';
import { ApiKeyModule } from 'src/common/api-key/api-key.module';
import { ApiKeyAdminController } from 'src/common/api-key/controllers/api-key.admin.controller';
import { AuthModule } from 'src/common/auth/auth.module';
import { RoleAdminController } from 'src/modules/role/controllers/role.admin.controller';
import { RoleModule } from 'src/modules/role/role.module';
import { SettingAdminController } from 'src/common/setting/controllers/setting.admin.controller';
import { PlaceAdminController } from 'src/modules/place/controllers/place.admin.controller';
import { PlaceModule } from 'src/modules/place/place.module';
import { PlanAdminController } from 'src/modules/plan/controllers/plan.admin.controller';
import { PlanModule } from 'src/modules/plan/plan.module';
import { ServiceAdminController } from 'src/modules/service/controllers/service.admin.controller';
import { ServiceModule } from 'src/modules/service/service.module';
import { UserAdminController } from 'src/modules/user/controllers/user.admin.controller';
import { UserModule } from 'src/modules/user/user.module';
import { RedisModule } from 'src/modules/redis/redis.module';

@Module({
    controllers: [
        SettingAdminController,
        ApiKeyAdminController,
        RoleAdminController,
        UserAdminController,
        ApiKeyAdminController,
        PlanAdminController,
        ServiceAdminController,
        PlaceAdminController
    ],
    providers: [],
    exports: [],
    imports: [
        RoleModule,
        UserModule,
        AuthModule,
        ApiKeyModule,
        PlanModule,
        ServiceModule,
        PlaceModule,
        RedisModule
    ],
})
export class RoutesAdminModule { }
