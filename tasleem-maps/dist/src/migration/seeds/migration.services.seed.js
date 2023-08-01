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
exports.MigrationServicesSeed = void 0;
const nestjs_command_1 = require("nestjs-command");
const common_1 = require("@nestjs/common");
const service_service_1 = require("../../modules/service/services/service.service");
const service_enum_constant_1 = require("../../modules/service/constants/service.enum.constant");
let MigrationServicesSeed = exports.MigrationServicesSeed = class MigrationServicesSeed {
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    async seeds() {
        try {
            await this.serviceService.create({
                name: "Places API",
                description: "Places API description",
                type: service_enum_constant_1.ENUM_SERVICE.PLACES_API_SERVICE
            });
            await this.serviceService.create({
                name: "Live Tracking API",
                description: "Live Tracking API description",
                type: service_enum_constant_1.ENUM_SERVICE.LIVE_TRACKING_API_SERVICE
            });
            await this.serviceService.create({
                name: "Map API",
                description: "Map API description",
                type: service_enum_constant_1.ENUM_SERVICE.MAP_API_SERVICE
            });
        }
        catch (err) {
            throw new Error(err.message);
        }
        return;
    }
    async remove() {
        try {
            await this.serviceService.deleteMany({});
        }
        catch (err) {
            throw new Error(err.message);
        }
        return;
    }
};
__decorate([
    (0, nestjs_command_1.Command)({
        command: 'seed:service',
        describe: 'seeds service',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MigrationServicesSeed.prototype, "seeds", null);
__decorate([
    (0, nestjs_command_1.Command)({
        command: 'remove:service',
        describe: 'remove service',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MigrationServicesSeed.prototype, "remove", null);
exports.MigrationServicesSeed = MigrationServicesSeed = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [service_service_1.ServiceService])
], MigrationServicesSeed);
//# sourceMappingURL=migration.services.seed.js.map