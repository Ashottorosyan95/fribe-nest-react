import { UserGetSerialization } from './user.get.serialization';
declare const UserProfileSerialization_base: import("@nestjs/common").Type<Omit<UserGetSerialization, "isActive" | "inactivePermanent" | "inactiveDate" | "blocked" | "blockedDate" | "passwordExpired" | "passwordCreated" | "passwordAttempt">>;
export declare class UserProfileSerialization extends UserProfileSerialization_base {
    readonly isActive: boolean;
    readonly inactivePermanent: boolean;
    readonly blocked: boolean;
    readonly passwordExpired: Date;
    readonly passwordCreated: Date;
    readonly passwordAttempt: number;
    readonly inactiveDate?: Date;
    readonly blockedDate?: Date;
}
export {};
