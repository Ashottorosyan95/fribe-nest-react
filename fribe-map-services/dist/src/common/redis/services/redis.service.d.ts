import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';
export declare class RedisService {
    private readonly configService;
    private readonly pubRedisClient;
    constructor(configService: ConfigService);
    getPubRedisClient(): Redis;
    decrementServiceUsageCount(clientId: string, serviceType: ENUM_SERVICE): Promise<void>;
}
