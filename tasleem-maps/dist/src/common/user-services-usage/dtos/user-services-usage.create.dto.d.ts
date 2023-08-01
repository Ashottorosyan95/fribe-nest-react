import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';
export declare class UserServicesUsageCreateDto {
    readonly userId: string;
    readonly serviceId: string;
    readonly serviceType: ENUM_SERVICE;
}
