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
exports.PlanService = void 0;
const plan_repository_1 = require("../repository/repositories/plan.repository");
const plan_entity_1 = require("../repository/entities/plan.entity");
const common_1 = require("@nestjs/common");
let PlanService = exports.PlanService = class PlanService {
    constructor(planRepository) {
        this.planRepository = planRepository;
    }
    async findOneById(_id, options) {
        return await this.planRepository.findOneById(_id, options);
    }
    async findOne(find, options) {
        return await this.planRepository.findOne(find, options);
    }
    getTotal(find, options) {
        return this.planRepository.getTotal(find, options);
    }
    deleteOneById(_id, options) {
        throw new Error('Method not implemented.');
    }
    deleteOne(find, options) {
        throw new Error('Method not implemented.');
    }
    async findAll(find, options) {
        return this.planRepository.findAll(find, options);
    }
    async create(data, options) {
        const create = new plan_entity_1.PlanEntity();
        create.name = data.name;
        create.services = data.services;
        return await this.planRepository.create(create, options);
    }
};
exports.PlanService = PlanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [plan_repository_1.PlanRepository])
], PlanService);
//# sourceMappingURL=plan.service.js.map