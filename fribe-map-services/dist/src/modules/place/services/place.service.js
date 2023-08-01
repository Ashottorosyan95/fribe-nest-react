"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceService = void 0;
const place_repository_1 = require("../repository/repositories/place.repository");
const common_1 = require("@nestjs/common");
const ulid_1 = require("ulid");
let PlaceService = exports.PlaceService = class PlaceService {
    constructor(placeRepository) {
        this.placeRepository = placeRepository;
    }
    async findAll(find, options) {
        return await this.placeRepository.findAll(find, options);
    }
    async findOne(find, options) {
        return await this.placeRepository.findOne(find, options);
    }
    async getTotal(find, options) {
        return await this.placeRepository.getTotal(find, options);
    }
    async create(data, options) {
        return await this.placeRepository.create(data, options);
    }
    async update(find, data, options) {
        return await this.placeRepository.updateOne(find, data, options);
    }
    async searchNearByPlaces(query, options) {
        const { location, name, radius } = query;
        let longitude = 0, latitude = 0;
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
                        coordinates: [longitude, latitude],
                    },
                },
            },
        };
        if (radius) {
            modifiedQuery.location.$near['$maxDistance'] = radius;
        }
        if (name) {
            modifiedQuery["$or"] = [{ name: new RegExp(name) }, { city: new RegExp(name) }, { formattedAddress: new RegExp(name) }];
        }
        try {
            let nearbyPlaces = await this.placeRepository.findAll({
                ...modifiedQuery,
            }, { ...options, select: { "name": 1, "_id": 1, "shortId": 1, "formattedAddress": 1, "location": 1 } });
            nearbyPlaces = nearbyPlaces.map((item) => {
                item.longitude = item.location.coordinates[0];
                item.latitude = item.location.coordinates[1];
                delete item.location;
                return item;
            });
            return nearbyPlaces;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }
    async addPlacesData(records) {
        const places = [];
        let nameArray = [];
        let duplicateName = 0;
        let duplicateNames = [];
        for (let index = 0; index < records.length; index++) {
            const item = records[index];
            const latitude = item[10] && +(String(item[10]).toString().includes('Lat') ? item[10].split(' ')[1] : 0);
            const longitude = item[11] && +(String(item[11]).toString().includes('Lng') ? item[11].split(' ')[1] : 0);
            if (item[0]) {
                let name = item[0];
                if (item[6]) {
                    name = name + ' ' + item[6];
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
                    shortId: (0, ulid_1.ulid)(),
                    additionalInfo: {
                        streetAddress: item[2],
                        municipality: item[4],
                        description: item[7],
                        firstCategory: item[8],
                        secondCategory: item[9],
                    }
                });
                if (nameArray.includes(item[0] + " " + latitude + " " + longitude)) {
                    duplicateName += 1;
                    duplicateNames.push(item[0] + " " + latitude + " " + longitude);
                }
                else {
                    nameArray.push(item[0] + " " + latitude + " " + longitude);
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
        let message = "Places has been added successfully.";
        if (duplicateName) {
            message = `There are ${duplicateName} duplicate name in uploaded excel file, ${nameArray.length} places has been processed.`;
        }
        return {
            message,
            duplicateNames
        };
    }
    async addPlace(body) {
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
            shortId: (0, ulid_1.ulid)(),
            additionalInfo: {}
        };
        let alreadyAdded = await this.findOne({ name: data.name, "location.coordinates": [Number(body.longitude), Number(body.latitude)] });
        if (alreadyAdded) {
            await this.update({ name: data.name, "location.coordinates": [Number(body.longitude), Number(body.latitude)] }, data);
            return {
                message: "Place is already added with this title and coordinates."
            };
        }
        else {
            let addedData = await this.create(data);
            let dataToSend = JSON.parse(JSON.stringify(addedData));
            delete dataToSend.location;
            delete dataToSend.createdAt;
            delete dataToSend.updatedAt;
            dataToSend.longitude = Number(body.longitude);
            dataToSend.latitude = Number(body.latitude);
            return { data: dataToSend, message: "Place has been added successfully." };
        }
    }
    async editPlace(body) {
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
        };
        let alreadyAdded = await this.findOne({ name: data.name, shortId: { $ne: body.shortId }, "location.coordinates": [Number(body.longitude), Number(body.latitude)] });
        if (alreadyAdded) {
            return {
                message: "Place is already added with this title and coordinates."
            };
        }
        else {
            let isUpdated = await this.update({ shortId: body.shortId }, data);
            if (isUpdated) {
                return { message: "Place has been updated successfully." };
            }
            else {
                return { message: "Unable to update place." };
            }
        }
    }
    async aggregate(pipeline, options) {
        return await this.placeRepository.raw(pipeline, options);
    }
};
exports.PlaceService = PlaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [place_repository_1.PlaceRepository])
], PlaceService);
//# sourceMappingURL=place.service.js.map