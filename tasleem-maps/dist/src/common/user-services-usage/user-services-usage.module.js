"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServicesUsageModule = void 0;
const common_1 = require("@nestjs/common");
const user_services_usage_service_1 = require("./services/user-services-usage.service");
const user_services_usage_repository_module_1 = require("./repository/user-services-usage.repository.module");
const user_services_usage_admin_controller_1 = require("./controllers/user-services-usage.admin.controller");
let UserServicesUsageModule = exports.UserServicesUsageModule = class UserServicesUsageModule {
};
exports.UserServicesUsageModule = UserServicesUsageModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [user_services_usage_repository_module_1.UserServicesUsageRepositoryModule],
        exports: [user_services_usage_service_1.UserServicesUsageService],
        providers: [user_services_usage_service_1.UserServicesUsageService],
        controllers: [user_services_usage_admin_controller_1.UserServicesUsageAdminController],
    })
], UserServicesUsageModule);
//# sourceMappingURL=user-services-usage.module.js.map