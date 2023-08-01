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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServicesUsageService = void 0;
const common_1 = require("@nestjs/common");
const user_services_usage_repository_1 = require("../repository/repositories/user-services-usage.repository");
const user_services_usage_entity_1 = require("../repository/entities/user-services-usage.entity");
let UserServicesUsageService = exports.UserServicesUsageService = class UserServicesUsageService {
    constructor(userServicesUsageRepository) {
        this.userServicesUsageRepository = userServicesUsageRepository;
    }
    async findAll(find, options) {
        return this.userServicesUsageRepository.findAll(find, options);
    }
    async findOneById(_id, options) {
        return this.userServicesUsageRepository.findOneById(_id, options);
    }
    async findOneByName(name, options) {
        return this.userServicesUsageRepository.findOne({ name }, options);
    }
    async getTotal(find, options) {
        return this.userServicesUsageRepository.getTotal(find, options);
    }
    async create({ userId, serviceId, serviceType }, options) {
        const create = new user_services_usage_entity_1.UserServicesUsageEntity();
        create.userId = userId;
        create.serviceId = serviceId;
        create.serviceType = serviceType;
        create.createdAt = new Date();
        create.updatedAt = new Date();
        return this.userServicesUsageRepository.create(create, options);
    }
    async delete(repository, options) {
        return this.userServicesUsageRepository.softDelete(repository, options);
    }
    async deleteMany(find, options) {
        return this.userServicesUsageRepository.deleteMany(find, options);
    }
};
exports.UserServicesUsageService = UserServicesUsageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_services_usage_repository_1.UserServicesUsageRepository])
], UserServicesUsageService);
//# sourceMappingURL=user-services-usage.service.js.map