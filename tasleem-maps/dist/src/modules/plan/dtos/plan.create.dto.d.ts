import { ENUM_PLAN_TIME_WINDOW } from '../constants/plan.time-window.constant';
export declare class PlanCreateDto {
    readonly name: string;
    readonly price: number;
    services: string[];
    readonly requestLimit: number;
    readonly timeWindow: ENUM_PLAN_TIME_WINDOW;
}
