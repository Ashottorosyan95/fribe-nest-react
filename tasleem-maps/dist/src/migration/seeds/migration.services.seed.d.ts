import { ServiceService } from 'src/modules/service/services/service.service';
export declare class MigrationServicesSeed {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    seeds(): Promise<void>;
    remove(): Promise<void>;
}
