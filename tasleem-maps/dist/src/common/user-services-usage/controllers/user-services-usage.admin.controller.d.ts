import { UserServicesUsageService } from '../services/user-services-usage.service';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { UserServicesUsageCreateDto } from '../dtos/user-services-usage.create.dto';
export declare class UserServicesUsageAdminController {
    private readonly userServicesUsageService;
    constructor(userServicesUsageService: UserServicesUsageService);
    create(body: UserServicesUsageCreateDto): Promise<IResponse>;
}
