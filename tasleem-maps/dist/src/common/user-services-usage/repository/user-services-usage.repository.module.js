"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServicesUsageRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_constant_1 = require("../../database/constants/database.constant");
const user_services_usage_repository_1 = require("./repositories/user-services-usage.repository");
const user_services_usage_entity_1 = require("./entities/user-services-usage.entity");
let UserServicesUsageRepositoryModule = exports.UserServicesUsageRepositoryModule = class UserServicesUsageRepositoryModule {
};
exports.UserServicesUsageRepositoryModule = UserServicesUsageRepositoryModule = __decorate([
    (0, common_1.Module)({
        providers: [user_services_usage_repository_1.UserServicesUsageRepository],
        exports: [user_services_usage_repository_1.UserServicesUsageRepository],
        controllers: [],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: user_services_usage_entity_1.UserServicesUsageEntity.name,
                    schema: user_services_usage_entity_1.UserServicesUsageSchema,
                },
            ], database_constant_1.DATABASE_CONNECTION_NAME),
        ],
    })
], UserServicesUsageRepositoryModule);
//# sourceMappingURL=user-services-usage.repository.module.js.map