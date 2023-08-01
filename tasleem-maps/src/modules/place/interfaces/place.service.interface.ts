import { IDatabaseCreateOptions, IDatabaseFindAllOptions, IDatabaseFindOneOptions, IDatabaseManyOptions, IDatabaseGetTotalOptions, IDatabaseSaveOptions } from "src/common/database/interfaces/database.interface";
import { PlaceEntity } from "../repository/entities/place.entity";
import { PlaceCreateDto } from "../dtos/place.create.dto";

export interface IPlaceService {
    findAll<T>(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<T[]>;

    findOne<T>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<T>;

    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number>;

    create(
        data: PlaceCreateDto,
        options?: IDatabaseCreateOptions
    ): Promise<PlaceEntity>;


    addPlacesData(
        data: any[],
    ): Promise<boolean>;

}