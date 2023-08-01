import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { ENUM_REDIS } from 'src/modules/redis/constants/redis.enum.constant';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';

@Injectable()
export class RedisService {
  private readonly pubRedisClient: Redis;

  constructor(
    private readonly configService: ConfigService,
  ) {

    const port = this.configService.get<string>('redis.port') || 6379;
    const host = this.configService.get<string>('redis.host') || 'localhost';

    let redisConfig = {
      port: +port,
      host,
    }

    this.pubRedisClient = new Redis(redisConfig);
  }

  getPubRedisClient(): Redis {
    return this.pubRedisClient;
  }

  async decrementServiceUsageCount(clientId: string, serviceType: ENUM_SERVICE) {
    console.log(clientId, serviceType)
    this.pubRedisClient.publish(ENUM_REDIS.DECREMENT_SERVICE_USAGE_COUNT, JSON.stringify({ clientId, serviceType }))
  }
}