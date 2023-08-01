import { BadRequestException, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { PlanEntity } from 'src/modules/plan/repository/entities/plan.entity';
import { PlanService } from 'src/modules/plan/services/plan.service';
import { ENUM_REDIS } from 'src/modules/redis/constants/redis.enum.constant';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';
import { UserDoc } from 'src/modules/user/repository/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  private readonly subRedisClient: Redis;
  private readonly pubRedisClient: Redis;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly planService: PlanService) {
    const port = this.configService.get<string>('redis.port') || 6379;
    const host = this.configService.get<string>('redis.host') || 'localhost';

    let redisConfig = {
      port: +port,
      host,
      autoResubscribe: true,
      maxRetriesPerRequest: 5,
      enableOfflineQueue: true,
      retryStrategy() {
        return 2000;
      },
    }

    this.subRedisClient = new Redis(redisConfig);
    this.pubRedisClient = new Redis(redisConfig);

    this.subRedisClient.subscribe(ENUM_REDIS.DECREMENT_SERVICE_USAGE_COUNT, async (err, count) => {
      if (err) {
        console.error("Failed to subscribe: %s", err.message);
      }
    })

    this.subRedisClient.on("message", async (channel, data) => {
      if (channel === ENUM_REDIS.DECREMENT_SERVICE_USAGE_COUNT) {
        const parseData = JSON.parse(data);
        const company: any = await this.pubRedisClient.get(parseData.clientId);
        const parseCompanyData = JSON.parse(company)
        const updatedCompany = {
          ...parseCompanyData,
          services: parseCompanyData.services.map(obj => {
            if (parseData.serviceType === obj.serviceType) {
              obj.usageCount -= 1;
            }
            return obj;
          })
        }
        await this.pubRedisClient.set(parseData.clientId, JSON.stringify(updatedCompany));
        const user: UserDoc = await this.userService.findOneByClientId(parseData.clientId);
        await this.userService.updateUsageCount(user, { serviceType: parseData.serviceType })
      }
    });

  }

  getPubRedisClient(): Redis {
    return this.pubRedisClient;
  }

  async loadCompaniesData() {
    const users = await this.userService.findAll();
    users.filter(user => user.subscribedPlan).map(async (user) => {
      const company = await this.pubRedisClient.get(user.clientId);
      if (!company) {
        const plan: PlanEntity = await this.planService.findOneById(user.subscribedPlan.planId);
        const requestLimit: number = plan.requestLimit;
        const updatedSubscribedPlan = {
          ...user.subscribedPlan,
          services: user.subscribedPlan.services.map(obj => {
            obj.usageCount = requestLimit;
            return obj;
          })
        }
        await this.pubRedisClient.set(user.clientId, JSON.stringify(updatedSubscribedPlan));
      }
    })
  }

  async decrementServiceUsageCount(clientId: string, serviceType: ENUM_SERVICE): Promise<object> {
    const company = await this.pubRedisClient.get(clientId);
    if (!company) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'No company found with provided client id.',
      });
    } else {
      const companyData = JSON.parse(company);
      const service = companyData.services.find(item => serviceType === item.serviceType)
      if (service && service.usageCount > 0) {
        return { message: "success" };
      } else {
        throw new BadRequestException({
          statusCode: 400,
          message: `You have reached a limit for using <${serviceType}> service.`,
        });
      }
    }
  }
}