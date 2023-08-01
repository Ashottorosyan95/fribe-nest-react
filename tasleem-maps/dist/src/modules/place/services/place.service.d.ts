import { IDatabaseFindAllOptions, IDatabaseFindOneOptions, IDatabaseCreateOptions, IDatabaseGetTotalOptions } from 'src/common/database/interfaces/database.interface';
import { PlaceCreateDto } from '../dtos/place.create.dto';
import { IPlaceService } from '../interfaces/place.service.interface';
import { PlaceEntity } from '../repository/entities/place.entity';
import { PlaceRepository } from '../repository/repositories/place.repository';
import { PlaceNearbySearchDto } from '../dtos/place.nearby.search.dto';
export declare class PlaceService implements IPlaceService {
    private readonly placeRepository;
    constructor(placeRepository: PlaceRepository);
    findAll<T>(find?: Record<string, any>, options?: IDatabaseFindAllOptions<any>): Promise<T[]>;
    findOne<T>(find: Record<string, any>, options?: IDatabaseFindOneOptions<any>): Promise<T>;
    getTotal(find?: Record<string, any>, options?: IDatabaseGetTotalOptions): Promise<number>;
    create(data: PlaceCreateDto, options?: IDatabaseCreateOptions<any>): Promise<PlaceEntity>;
    searchNearByPlaces<T>(query: Partial<PlaceNearbySearchDto>, options?: IDatabaseFindAllOptions<any>): Promise<T[]>;
    addPlacesData<T>(records: any[]): Promise<boolean>;
}
