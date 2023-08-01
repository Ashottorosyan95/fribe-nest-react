export declare class UserServiceUsage {
    serviceId: string;
    serviceName: string;
    usageCount: number;
}
export declare class UserSubscribedPlan {
    planId: string;
    services: UserServiceUsage[];
}
