"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_constant_1 = require("../../../common/database/constants/database.constant");
const service_entity_1 = require("./entities/service.entity");
const service_repository_1 = require("./repositories/service.repository");
let ServiceRepositoryModule = exports.ServiceRepositoryModule = class ServiceRepositoryModule {
};
exports.ServiceRepositoryModule = ServiceRepositoryModule = __decorate([
    (0, common_1.Module)({
        providers: [service_repository_1.ServiceRepository],
        exports: [service_repository_1.ServiceRepository],
        controllers: [],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: service_entity_1.ServiceEntity.name,
                    schema: service_entity_1.ServiceSchema,
                },
            ], database_constant_1.DATABASE_CONNECTION_NAME),
        ],
    })
], ServiceRepositoryModule);
//# sourceMappingURL=service.repository.module.js.map