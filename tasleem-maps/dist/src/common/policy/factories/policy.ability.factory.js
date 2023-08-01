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
exports.PolicyAbilityFactory = void 0;
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const helper_number_service_1 = require("../../helper/services/helper.number.service");
const policy_enum_constant_1 = require("../constants/policy.enum.constant");
const policy_enum_constant_2 = require("../constants/policy.enum.constant");
const role_enum_constant_1 = require("../../../modules/role/constants/role.enum.constant");
let PolicyAbilityFactory = exports.PolicyAbilityFactory = class PolicyAbilityFactory {
    constructor(helperNumberService) {
        this.helperNumberService = helperNumberService;
    }
    defineAbilityFromRole({ type, permissions }) {
        const { can, build } = new ability_1.AbilityBuilder(ability_1.createMongoAbility);
        if (type === role_enum_constant_1.ENUM_ROLE_TYPE.SUPER_ADMIN) {
            can(policy_enum_constant_2.ENUM_POLICY_ACTION.MANAGE, 'all');
        }
        else {
            for (const permission of permissions) {
                const abilities = this.mappingAbility(permission);
                for (const ability of abilities) {
                    can(ability.action, ability.subject);
                }
            }
        }
        return build();
    }
    mappingAbility({ subject, action, }) {
        return action
            .split(',')
            .map((val) => ({
            action: this.mappingRequestRule(this.helperNumberService.create(val)),
            subject,
        }))
            .flat(1);
    }
    mappingRequestRule(action) {
        switch (action) {
            case policy_enum_constant_1.ENUM_POLICY_REQUEST_ACTION.MANAGE:
                return policy_enum_constant_2.ENUM_POLICY_ACTION.MANAGE;
            case policy_enum_constant_1.ENUM_POLICY_REQUEST_ACTION.READ:
                return policy_enum_constant_2.ENUM_POLICY_ACTION.READ;
            case policy_enum_constant_1.ENUM_POLICY_REQUEST_ACTION.CREATE:
                return policy_enum_constant_2.ENUM_POLICY_ACTION.CREATE;
            case policy_enum_constant_1.ENUM_POLICY_REQUEST_ACTION.UPDATE:
                return policy_enum_constant_2.ENUM_POLICY_ACTION.UPDATE;
            case policy_enum_constant_1.ENUM_POLICY_REQUEST_ACTION.DELETE:
                return policy_enum_constant_2.ENUM_POLICY_ACTION.DELETE;
            case policy_enum_constant_1.ENUM_POLICY_REQUEST_ACTION.EXPORT:
                return policy_enum_constant_2.ENUM_POLICY_ACTION.EXPORT;
            case policy_enum_constant_1.ENUM_POLICY_REQUEST_ACTION.IMPORT:
                return policy_enum_constant_2.ENUM_POLICY_ACTION.IMPORT;
            default:
                return null;
        }
    }
    handlerRules(rules) {
        return rules
            .map(({ subject, action }) => {
            return action
                .map((val) => (ability) => ability.can(val, subject))
                .flat(1);
        })
            .flat(1);
    }
};
exports.PolicyAbilityFactory = PolicyAbilityFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [helper_number_service_1.HelperNumberService])
], PolicyAbilityFactory);
//# sourceMappingURL=policy.ability.factory.js.map