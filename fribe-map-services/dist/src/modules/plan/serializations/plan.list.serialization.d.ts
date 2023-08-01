import { PlanGetSerialization } from './plan.get.serialization';
declare const PlanListSerialization_base: import("@nestjs/common").Type<Omit<PlanGetSerialization, "services">>;
export declare class PlanListSerialization extends PlanListSerialization_base {
    readonly servicesCount: number;
}
export {};
