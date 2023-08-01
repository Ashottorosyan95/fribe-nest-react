"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const plan_service_1 = require("../../../modules/plan/services/plan.service");
const redis_enum_constant_1 = require("../../../modules/redis/constants/redis.enum.constant");
const user_service_1 = require("../../../modules/user/services/user.service");
const config_1 = require("@nestjs/config");
let RedisService = exports.RedisService = class RedisService {
    constructor(configService, userService, planService) {
        this.configService = configService;
        this.userService = userService;
        this.planService = planService;
        const port = this.configService.get('redis.port') || 6379;
        const host = this.configService.get('redis.host') || 'localhost';
        let redisConfig = {
            port: +port,
            host,
            autoResubscribe: true,
            maxRetriesPerRequest: 5,
            enableOfflineQueue: true,
            retryStrategy() {
                return 2000;
            },
        };
        this.subRedisClient = new ioredis_1.default(redisConfig);
        this.pubRedisClient = new ioredis_1.default(redisConfig);
        this.subRedisClient.subscribe(redis_enum_constant_1.ENUM_REDIS.DECREMENT_SERVICE_USAGE_COUNT, async (err, count) => {
            if (err) {
                console.error("Failed to subscribe: %s", err.message);
            }
        });
        this.subRedisClient.on("message", async (channel, data) => {
            if (channel === redis_enum_constant_1.ENUM_REDIS.DECREMENT_SERVICE_USAGE_COUNT) {
                const parseData = JSON.parse(data);
                const company = await this.pubRedisClient.get(parseData.clientId);
                const parseCompanyData = JSON.parse(company);
                const updatedCompany = {
                    ...parseCompanyData,
                    services: parseCompanyData.services.map(obj => {
                        if (parseData.serviceType === obj.serviceType) {
                            obj.usageCount -= 1;
                        }
                        return obj;
                    })
                };
                await this.pubRedisClient.set(parseData.clientId, JSON.stringify(updatedCompany));
                const user = await this.userService.findOneByClientId(parseData.clientId);
                await this.userService.updateUsageCount(user, { serviceType: parseData.serviceType });
            }
        });
    }
    getPubRedisClient() {
        return this.pubRedisClient;
    }
    async loadCompaniesData() {
        const users = await this.userService.findAll();
        users.filter(user => user.subscribedPlan).map(async (user) => {
            const company = await this.pubRedisClient.get(user.clientId);
            if (!company) {
                const plan = await this.planService.findOneById(user.subscribedPlan.planId);
                const requestLimit = plan.requestLimit;
                const updatedSubscribedPlan = {
                    ...user.subscribedPlan,
                    services: user.subscribedPlan.services.map(obj => {
                        obj.usageCount = requestLimit;
                        return obj;
                    })
                };
                await this.pubRedisClient.set(user.clientId, JSON.stringify(updatedSubscribedPlan));
            }
        });
    }
    async decrementServiceUsageCount(clientId, serviceType) {
        const company = await this.pubRedisClient.get(clientId);
        if (!company) {
            throw new common_1.BadRequestException({
                statusCode: 400,
                message: 'No company found with provided client id.',
            });
        }
        else {
            const companyData = JSON.parse(company);
            const service = companyData.services.find(item => serviceType === item.serviceType);
            if (service && service.usageCount > 0) {
                return { message: "success" };
            }
            else {
                throw new common_1.BadRequestException({
                    statusCode: 400,
                    message: `You have reached a limit for using <${serviceType}> service.`,
                });
            }
        }
    }
};
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService,
        plan_service_1.PlanService])
], RedisService);
//# sourceMappingURL=redis.service.js.map