import { Module } from '@nestjs/common';
import { ApiKeyModule } from 'src/common/api-key/api-key.module';
import { AuthModule } from 'src/common/auth/auth.module';
import { AwsModule } from 'src/common/aws/aws.module';
import { UserAuthController } from 'src/modules/user/controllers/user.auth.controller';
import { UserModule } from 'src/modules/user/user.module';

@Module({
    controllers: [UserAuthController],
    providers: [],
    exports: [],
    imports: [UserModule, AuthModule, AwsModule, ApiKeyModule],
})
export class RoutesAuthModule { }
