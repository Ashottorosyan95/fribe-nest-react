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
import { PlaceAddLocationDto } from '../dtos/place.addLocation.dto';
import { PlaceEditLocationDto } from '../dtos/place.editLocation.dto copy';

@Injectable()
export class PlaceService implements IPlaceService {
    constructor(private readonly placeRepository: PlaceRepository) { }

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

    async update(
        find: any,
        data: PlaceCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<any> {
        return await this.placeRepository.updateOne(find, data, options);
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
            modifiedQuery["$or"] = [{ name: new RegExp(name) }, { city: new RegExp(name) }, { formattedAddress: new RegExp(name) }]
        }

        try {
            let nearbyPlaces = await this.placeRepository.findAll<T>({
                ...modifiedQuery,
            }, { ...options, select: { "name": 1, "_id": 1, "shortId": 1, "formattedAddress": 1, "location": 1 } });

            nearbyPlaces = nearbyPlaces.map((item: any) => {

                item.longitude = item.location.coordinates[0]
                item.latitude = item.location.coordinates[1]
                delete item.location
                return item
            })
            return nearbyPlaces;
        } catch (error) {
            console.log(error)
            return []
        }

    }


    async addPlacesData<T>(records: any[]): Promise<any> {

        const places: PlaceCreateDto[] = [];
        let nameArray = []
        let duplicateName = 0
        let duplicateNames = []
        for (let index = 0; index < records.length; index++) {
            const item = records[index];
            const latitude = item[10] && +(String(item[10]).toString().includes('Lat') ? item[10].split(' ')[1] : 0);
            const longitude = item[11] && +(String(item[11]).toString().includes('Lng') ? item[11].split(' ')[1] : 0);
            if (item[0]) {
                let name = item[0]
                if (item[6]) {
                    name = name + ' ' + item[6]
                }
                places.push({
                    name: name,
                    formattedAddress: item[1],
                    country: item[5],
                    city: item[3],
                    location: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    shortId: ulid(),
                    additionalInfo: {
                        streetAddress: item[2],
                        municipality: item[4],
                        description: item[7],
                        firstCategory: item[8],
                        secondCategory: item[9],
                    }
                })
                if (nameArray.includes(item[0] + " " + latitude + " " + longitude)) {
                    duplicateName += 1
                    duplicateNames.push(item[0] + " " + latitude + " " + longitude)
                } else {
                    nameArray.push(item[0] + " " + latitude + " " + longitude)
                }
            }

        }

        const upsertOperations = places.map((placeData) => ({
            updateOne: {
                filter: { name: placeData.name, "location.coordinates": [Number(placeData.location.coordinates[0]), Number(placeData.location.coordinates[1])] },
                update: { $set: placeData },
                upsert: true,
            },
        }));

        const result = await this.placeRepository.bulkWrite(upsertOperations);


        let message = "Places has been added successfully."
        if (duplicateName) {
            message = `There are ${duplicateName} duplicate name in uploaded excel file, ${nameArray.length} places has been processed.`
        }

        return {
            message,
            duplicateNames
        };
    }


    async addPlace<T>(body: PlaceAddLocationDto): Promise<any> {

        let data = {
            name: body.name,
            formattedAddress: body.formattedAddress,
            country: body.country,
            city: body.city,
            category: body.category,
            location: {
                type: 'Point',
                coordinates: [Number(body.longitude), Number(body.latitude)]
            },
            shortId: ulid(),
            additionalInfo: {}

        }

        let alreadyAdded = await this.findOne({ name: data.name, "location.coordinates": [Number(body.longitude), Number(body.latitude)] })

        if (alreadyAdded) {
            await this.update({ name: data.name, "location.coordinates": [Number(body.longitude), Number(body.latitude)] }, data);
            return {
                message: "Place is already added with this title and coordinates."
            }
        } else {
            let addedData = await this.create(data)
            let dataToSend = JSON.parse(JSON.stringify(addedData))
            delete dataToSend.location
            delete dataToSend.createdAt
            delete dataToSend.updatedAt
            dataToSend.longitude = Number(body.longitude)
            dataToSend.latitude = Number(body.latitude)
            return { data: dataToSend, message: "Place has been added successfully." }
        }
    }

    async editPlace<T>(body: PlaceEditLocationDto): Promise<any> {

        let data = {
            name: body.name,
            formattedAddress: body.formattedAddress,
            country: body.country,
            city: "",
            location: {
                type: 'Point',
                coordinates: [Number(body.longitude), Number(body.latitude)]
            },
            additionalInfo: {}
        }

        let alreadyAdded = await this.findOne({ name: data.name, shortId: { $ne: body.shortId }, "location.coordinates": [Number(body.longitude), Number(body.latitude)] })
        if (alreadyAdded) {
            return {
                message: "Place is already added with this title and coordinates."
            }
        } else {
            let isUpdated = await this.update({ shortId: body.shortId }, data)
            if (isUpdated) {
                return { message: "Place has been updated successfully." }
            } else {
                return { message: "Unable to update place." }
            }
        }
    }

    async aggregate<T>(
        pipeline: any[],
        options?: IDatabaseFindAllOptions<any>
    ): Promise<T[]> {
        return await this.placeRepository.raw<T>(pipeline, options);
    }


}
