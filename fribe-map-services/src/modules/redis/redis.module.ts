import { Module } from '@nestjs/common';
import { RedisService } from 'src/common/redis/services/redis.service';
import { UserModule } from '../user/user.module';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [UserModule, PlanModule],
  providers: [RedisService],
  controllers: [],
  exports: [RedisService],
})
export class RedisModule { }