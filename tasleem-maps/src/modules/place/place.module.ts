import { Module } from '@nestjs/common';
import { PlaceRepositoryModule } from './repository/place.repository.module';
import { PlaceService } from './services/place.service';

@Module({
    imports: [PlaceRepositoryModule],
    exports: [PlaceService],
    providers: [PlaceService],
    controllers: [],
})
export class PlaceModule {}
