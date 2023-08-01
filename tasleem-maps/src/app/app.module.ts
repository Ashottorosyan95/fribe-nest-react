import { Module } from '@nestjs/common';
import { JobsModule } from 'src/jobs/jobs.module';
import { AppController } from './controllers/app.controller';
import { RouterModule } from 'src/router/router.module';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/common/auth/auth.module';
import { RedisModule } from 'src/modules/redis/redis.module';

@Module({
    controllers: [AppController],
    providers: [],
    imports: [
        CommonModule,

        // Jobs
        JobsModule.forRoot(),

        // Routes
        RouterModule.forRoot(),

        AuthModule.forRoot(),

        RedisModule
    ],
})
export class AppModule { }
