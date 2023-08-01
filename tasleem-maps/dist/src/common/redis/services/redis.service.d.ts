import Redis from 'ioredis';
import { PlanService } from 'src/modules/plan/services/plan.service';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';
import { UserService } from 'src/modules/user/services/user.service';
import { ConfigService } from '@nestjs/config';
export declare class RedisService {
    private readonly configService;
    private readonly userService;
    private readonly planService;
    private readonly subRedisClient;
    private readonly pubRedisClient;
    constructor(configService: ConfigService, userService: UserService, planService: PlanService);
    getPubRedisClient(): Redis;
    loadCompaniesData(): Promise<void>;
    decrementServiceUsageCount(clientId: string, serviceType: ENUM_SERVICE): Promise<object>;
}
