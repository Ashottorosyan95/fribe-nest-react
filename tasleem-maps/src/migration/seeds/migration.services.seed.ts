import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ServiceService } from 'src/modules/service/services/service.service';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';

@Injectable()
export class MigrationServicesSeed {
    constructor(private readonly serviceService: ServiceService) { }

    @Command({
        command: 'seed:service',
        describe: 'seeds service',
    })
    async seeds(): Promise<void> {
        try {
            await this.serviceService.create({
                name: "Places API",
                description: "Places API description",
                type: ENUM_SERVICE.PLACES_API_SERVICE
            });
            await this.serviceService.create({
                name: "Live Tracking API",
                description: "Live Tracking API description",
                type: ENUM_SERVICE.LIVE_TRACKING_API_SERVICE
            });
            await this.serviceService.create({
                name: "Map API",
                description: "Map API description",
                type: ENUM_SERVICE.MAP_API_SERVICE
            });
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }

    @Command({
        command: 'remove:service',
        describe: 'remove service',
    })
    async remove(): Promise<void> {
        try {
            await this.serviceService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }
        return;
    }
}
