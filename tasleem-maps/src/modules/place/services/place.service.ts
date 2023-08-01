import {
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseCreateOptions,
    IDatabaseManyOptions,
    IDatabaseGetTotalOptions,
} from 'src/common/database/interfaces/database.interface';
import { PlaceCreateDto } from '../dtos/place.create.dto';
import { IPlaceService } from '../interfaces/place.service.interface';
import { PlaceEntity } from '../repository/entities/place.entity';
import { PlaceRepository } from '../repository/repositories/place.repository';
import { Injectable } from '@nestjs/common';
import { PlaceNearbySearchDto } from '../dtos/place.nearby.search.dto';
import { ulid } from 'ulid'

@Injectable()
export class PlaceService implements IPlaceService {
    constructor(private readonly placeRepository: PlaceRepository) {}

    async findAll<T>(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions<any>
    ): Promise<T[]> {
        return await this.placeRepository.findAll<T>(find, options);
    }

    async findOne<T>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions<any>
    ): Promise<T> {
        return await this.placeRepository.findOne<T>(find, options);
    }

    async getTotal(
        find?: Record<string, any>,
       options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return await this.placeRepository.getTotal(find, options);
    }

    async create(
        data: PlaceCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<PlaceEntity> {
        return await this.placeRepository.create(data, options);
    }

    async searchNearByPlaces<T>(
        query: Partial<PlaceNearbySearchDto>,
        options?: IDatabaseFindAllOptions<any>
    ): Promise<T[]> {
        const { location, name, radius } = query;
        let longitude = 0,
            latitude = 0;
        if (location) {
            const arr = location.split(',');
            longitude = +arr[0];
            latitude = +arr[1];
        }

        const modifiedQuery = {
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude], // Note that the order is [longitude, latitude]
                    },
                },
            },
        };

        if (radius) {
            modifiedQuery.location.$near['$maxDistance'] = radius; // The maximum distance (in meters) from the specified point
        }

        if (name) {
            // add text search places
        }

        const nearbyPlaces = await this.placeRepository.findAll<T>({
            ...modifiedQuery,
        }, options);

        return nearbyPlaces;
    }


    async addPlacesData<T>(records: any[]): Promise<boolean>  {

        const places: PlaceCreateDto[] = [];
       for (let index = 0; index < records.length; index++) {
        const item = records[index];
        
        const latitude =  item[20] && +(String(item[20]).toString().includes('Lat') ? item[20].split(' ')[1] : 0);
        const longitude = item[21] && +(String(item[21]).toString().includes('Lng') ? item[21].split(' ')[1] : 0);

        places.push({
            name : item[0],
            formattedAddress : item[1],
            country : 'oman',
            city : 'muscat',
            location: {
                type: 'Point',
                coordinates : [longitude, latitude]
            },
            shortId: ulid()
        })

       }

        const upsertOperations = places.map((placeData) => ({
            updateOne: {
            filter: { name: placeData.name },
            update: { $set: placeData },
            upsert: true,
            },
        }));

       const result = await this.placeRepository.bulkWrite(upsertOperations);
       
       return result;
    }
}
