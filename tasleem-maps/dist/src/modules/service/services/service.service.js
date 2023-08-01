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
exports.ServiceService = void 0;
const service_repository_1 = require("../repository/repositories/service.repository");
const common_1 = require("@nestjs/common");
const service_entity_1 = require("../repository/entities/service.entity");
let ServiceService = exports.ServiceService = class ServiceService {
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    async findOneById(_id, options) {
        return await this.serviceRepository.findOneById(_id, options);
    }
    async findOne(find, options) {
        return await this.serviceRepository.findOne(find, options);
    }
    getTotal(find, options) {
        return this.serviceRepository.getTotal(find, options);
    }
    deleteOneById(_id, options) {
        throw new Error('Method not implemented.');
    }
    deleteOne(find, options) {
        throw new Error('Method not implemented.');
    }
    async deleteMany(find, options) {
        return this.serviceRepository.deleteMany(find, options);
    }
    async findAll(find, options) {
        return this.serviceRepository.findAll(find, options);
    }
    async create(data, options) {
        const create = new service_entity_1.ServiceEntity();
        create.name = data.name;
        create.description = data.description;
        create.type = data.type;
        return await this.serviceRepository.create(create, options);
    }
};
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [service_repository_1.ServiceRepository])
], ServiceService);
//# sourceMappingURL=service.service.js.map