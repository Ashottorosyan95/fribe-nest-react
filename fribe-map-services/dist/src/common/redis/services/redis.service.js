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
const config_1 = require("@nestjs/config");
const ioredis_1 = __importDefault(require("ioredis"));
const redis_enum_constant_1 = require("../../../modules/redis/constants/redis.enum.constant");
let RedisService = exports.RedisService = class RedisService {
    constructor(configService) {
        this.configService = configService;
        const port = this.configService.get('redis.port') || 6379;
        const host = this.configService.get('redis.host') || 'localhost';
        let redisConfig = {
            port: +port,
            host,
        };
        this.pubRedisClient = new ioredis_1.default(redisConfig);
    }
    getPubRedisClient() {
        return this.pubRedisClient;
    }
    async decrementServiceUsageCount(clientId, serviceType) {
        console.log(clientId, serviceType);
        this.pubRedisClient.publish(redis_enum_constant_1.ENUM_REDIS.DECREMENT_SERVICE_USAGE_COUNT, JSON.stringify({ clientId, serviceType }));
    }
};
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisService);
//# sourceMappingURL=redis.service.js.map