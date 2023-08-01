import { HelperNumberService } from 'src/common/helper/services/helper.number.service';
import { ENUM_POLICY_ACTION } from 'src/common/policy/constants/policy.enum.constant';
import { IPolicyAbility, IPolicyRequest, IPolicyRule, IPolicyRuleAbility, PolicyHandler } from 'src/common/policy/interfaces/policy.interface';
import { UserPayloadPermissionSerialization } from 'src/modules/user/serializations/user.payload.serialization';
export declare class PolicyAbilityFactory {
    private readonly helperNumberService;
    constructor(helperNumberService: HelperNumberService);
    defineAbilityFromRole({ type, permissions }: IPolicyRequest): IPolicyAbility;
    mappingAbility({ subject, action, }: UserPayloadPermissionSerialization): IPolicyRuleAbility[];
    mappingRequestRule(action: number): ENUM_POLICY_ACTION;
    handlerRules(rules: IPolicyRule[]): PolicyHandler[];
}
