"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_constant_1 = require("../../../common/database/constants/database.constant");
const plan_entity_1 = require("./entities/plan.entity");
const plan_repository_1 = require("./repositories/plan.repository");
let PlanRepositoryModule = exports.PlanRepositoryModule = class PlanRepositoryModule {
};
exports.PlanRepositoryModule = PlanRepositoryModule = __decorate([
    (0, common_1.Module)({
        providers: [plan_repository_1.PlanRepository],
        exports: [plan_repository_1.PlanRepository],
        controllers: [],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: plan_entity_1.PlanEntity.name,
                    schema: plan_entity_1.PlanSchema,
                },
            ], database_constant_1.DATABASE_CONNECTION_NAME),
        ],
    })
], PlanRepositoryModule);
//# sourceMappingURL=plan.repository.module.js.map