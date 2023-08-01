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
exports.ValidateCredentialsInterceptor = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const rxjs_1 = require("rxjs");
const auth_config_1 = __importDefault(require("../../../configs/auth.config"));
let ValidateCredentialsInterceptor = exports.ValidateCredentialsInterceptor = class ValidateCredentialsInterceptor {
    constructor(serviceType) {
        this.authServiceUrl = (0, auth_config_1.default)().authServiceUrl;
        this.serviceType = serviceType;
    }
    async intercept(context, next) {
        let req = context.switchToHttp().getRequest();
        let publishableKey = req.query.publishableKey ? req.query.publishableKey : req.body.publishableKey;
        let clientId = req.query.clientId ? req.query.clientId : req.body.clientId;
        if (!publishableKey || !clientId) {
            return (0, rxjs_1.throwError)(() => new common_1.BadRequestException());
        }
        try {
            let response = await axios_1.default.post(`${this.authServiceUrl}/api/v1/public/user/validatePublishableKey`, { publishableKey, serviceType: this.serviceType });
            if (response.data) {
                return next.handle();
            }
            else {
                return (0, rxjs_1.throwError)(() => new common_1.BadRequestException("Unable to validate your request at this time."));
            }
        }
        catch (error) {
            console.log(error.response.data.message);
            return (0, rxjs_1.throwError)(() => new common_1.BadRequestException(error?.response?.data?.message));
        }
    }
};
exports.ValidateCredentialsInterceptor = ValidateCredentialsInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], ValidateCredentialsInterceptor);
//# sourceMappingURL=request.validate.interceptor.js.map