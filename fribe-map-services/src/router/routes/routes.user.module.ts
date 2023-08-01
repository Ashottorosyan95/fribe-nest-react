import { Module } from '@nestjs/common';
import { ApiKeyModule } from 'src/common/api-key/api-key.module';
import { PlaceController } from 'src/modules/place/controllers/place.controller';
import { PlaceModule } from 'src/modules/place/place.module';
import { RedisModule } from 'src/modules/redis/redis.module';
import { RoleModule } from 'src/modules/role/role.module';
import { UserUserController } from 'src/modules/user/controllers/user.user.controller';
import { UserModule } from 'src/modules/user/user.module';

@Module({
    controllers: [UserUserController, PlaceController],
    providers: [],
    exports: [],
    imports: [UserModule, ApiKeyModule, RoleModule, PlaceModule, RedisModule],
})
export class RoutesUserModule { }
