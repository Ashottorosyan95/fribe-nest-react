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
        }
        const nearbyPlaces = await this.placeRepository.findAll({
            ...modifiedQuery,
        }, options);
        return nearbyPlaces;
    }
    async addPlacesData(records) {
        const places = [];
        for (let index = 0; index < records.length; index++) {
            const item = records[index];
            const latitude = item[20] && +(String(item[20]).toString().includes('Lat') ? item[20].split(' ')[1] : 0);
            const longitude = item[21] && +(String(item[21]).toString().includes('Lng') ? item[21].split(' ')[1] : 0);
            places.push({
                name: item[0],
                formattedAddress: item[1],
                country: 'oman',
                city: 'muscat',
                location: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                shortId: (0, ulid_1.ulid)()
            });
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
};
exports.PlaceService = PlaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [place_repository_1.PlaceRepository])
], PlaceService);
//# sourceMappingURL=place.service.js.map