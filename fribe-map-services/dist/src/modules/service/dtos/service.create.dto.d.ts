import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';
export declare class ServiceCreateDto {
    readonly name: string;
    readonly description: string;
    type: ENUM_SERVICE;
}
