import {
    Query,
    Body,
    Controller,
    InternalServerErrorException,
    Get,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
    VERSION_NEUTRAL
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { IResponse } from 'src/common/response/interfaces/response.interface';

import { PlaceService } from '../services/place.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';
import { UploadPlaceDataDoc, AddLocation, GetLocationWithLatLongDoc, PlaceGetDoc, PlaceFindNearbySearchDoc, TextSearchDoc } from '../docs/place.doc';
import { PlaceAddLocationDto } from '../dtos/place.addLocation.dto';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { ulid } from 'ulid'
import { PlaceEditLocationDto } from '../dtos/place.editLocation.dto copy';
import { PlaceGetSerialization } from '../serializations/place.get.serialization';
import { PaginationQuery, PaginationQueryTextSearch } from 'src/common/pagination/decorators/pagination.decorator';
import { PaginationListDto, TextSearchDto } from 'src/common/pagination/dtos/pagination.list.dto';
import { Response } from 'src/common/response/decorators/response.decorator';
import { PLACE_DEFAULT_AVAILABLE_ORDER_BY, PLACE_DEFAULT_AVAILABLE_SEARCH, PLACE_DEFAULT_ORDER_BY, PLACE_DEFAULT_ORDER_DIRECTION, PLACE_DEFAULT_PER_PAGE } from '../constants/place.list.constants';
import { PlaceNearbySearchDto } from '../dtos/place.nearby.search.dto';
import { PlaceEntity } from '../repository/entities/place.entity';

@ApiTags('modules.admin.place')
@Controller({
    version: VERSION_NEUTRAL,
    path: '/place',
})
export class PlaceAdminController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly placeService: PlaceService
    ) { }

    // upload excel sheet
    @UploadPlaceDataDoc()
    @Post('/uploadexcel-data')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const fileName = uuidv4() + path.extname(file.originalname);
                    cb(null, fileName);
                },
            }),
            limits: {
                fileSize: 1024 * 1024 * 50, // 50 MB limit
            },
        })
    )
    async uploadExcelData(@UploadedFile() file): Promise<IResponse> {
        try {
            const workbook = XLSX.readFile(file.path);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const records = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Remove header row
            records.shift();

            // Save records to the database
            let response = await this.placeService.addPlacesData(records);

            return {
                data: response,
            };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                _error: error.message,
            });

        }
    }

    // Add Location
    @AddLocation()
    @Post('/')
    async addLocation(@Body() body: PlaceAddLocationDto): Promise<any> {
        try {
            let result = await this.placeService.addPlace(body);
            return result;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                _error: error.message,
            });
        }
    }

    // Add Location
    @AddLocation()
    @Put('/')
    async editLocation(@Body()
    body: PlaceEditLocationDto): Promise<any> {
        try {
            let result = await this.placeService.editPlace(body);
            return result;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                _error: error.message,
            });
        }
    }

    @GetLocationWithLatLongDoc()
    @Get('/')
    async getPlaceDataFromLatLong(@Query('lat') lat: string, @Query('long') long: string): Promise<any> {
        try {
            const placeData = await this.placeService.findOne({ "location.coordinates": [Number(lat), Number(long)] });
            console.log(placeData)
            return {
                data: placeData,
            };;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                _error: error.message,
            });
        }
    }
    /* single */
    @PlaceGetDoc()
    @Response('place.get', {
        serialization: PlaceGetSerialization,
    })
    @Get('/findplacefromtext')

    async findPlaceFromText(
        @PaginationQueryTextSearch() { _search }: TextSearchDto,
    ): Promise<IResponse> {

        if (!_search) {
            return { data: {} };
        }

        const find: Record<string, any> = {
            ..._search,
        };


        let data = []
        try {
            data = await this.placeService.aggregate([
                { "$match": find },
                {
                    $addFields: {
                        longitude: { $arrayElemAt: ["$location.coordinates", 0] },
                        latitude: { $arrayElemAt: ["$location.coordinates", 1] }
                    }
                },
                { $project: { "name": 1, "_id": 1, "shortId": 1, "country": 1, "city": 1, "formattedAddress": 1, "latitude": 1, "longitude": 1 } },
                { $limit: 1 }
            ]);

        } catch (error) {
            console.log(error)
        }

        // const result = await this.placeService.findOne(find);
        return { data: data };
    }

    @PlaceFindNearbySearchDoc()
    @Get('/nearbysearch')
    async searchNearByPlaces(
        @PaginationQuery(
            PLACE_DEFAULT_PER_PAGE,
            PLACE_DEFAULT_ORDER_BY,
            PLACE_DEFAULT_ORDER_DIRECTION,
            PLACE_DEFAULT_AVAILABLE_SEARCH,
            PLACE_DEFAULT_AVAILABLE_ORDER_BY
        ) { _limit, _offset, _order }: PaginationListDto,
        @Query() query: PlaceNearbySearchDto
    ): Promise<IResponse> {
        console.log(' >>>>>> ', query);

        // first 20 by default Max 50
        const result: PlaceEntity[] =
            await this.placeService.searchNearByPlaces(query, {
                paging: {
                    limit: _limit,
                    offset: _offset,
                },
                order: _order,
            });
        return {
            data: result
        };
    }

    /* list */
    @TextSearchDoc()
    @Get('/textsearch')
    // @Response('place.list', {
    //     serialization: PlaceListSerialization,
    // })
    async findByTextSearch(
        @PaginationQuery(
            PLACE_DEFAULT_PER_PAGE,
            PLACE_DEFAULT_ORDER_BY,
            PLACE_DEFAULT_ORDER_DIRECTION,
            PLACE_DEFAULT_AVAILABLE_SEARCH,
            PLACE_DEFAULT_AVAILABLE_ORDER_BY
        ) { _limit, _offset, _order }: PaginationListDto,
        @PaginationQueryTextSearch() { _search }: TextSearchDto,
    ): Promise<any> {

        if (!_search) {
            return {
                _pagination: { total: 0, totalPage: 0, currentPage: 0 },
                data: []
            };
        }

        const find: Record<string, any> = {
            ..._search,
        };
        let limit = _limit ? _limit : PLACE_DEFAULT_PER_PAGE
        let data = []
        try {
            data = await this.placeService.aggregate([
                { "$match": find },
                {
                    $addFields: {
                        longitude: { $arrayElemAt: ["$location.coordinates", 0] },
                        latitude: { $arrayElemAt: ["$location.coordinates", 1] },
                    }
                },
                { $project: { "name": 1, "_id": 1, "shortId": 1, "country": 1, "city": 1, "formattedAddress": 1, "latitude": 1, "longitude": 1 } },
                { $limit: limit },
                { "$skip": _offset }
            ]);

        } catch (error) {
            console.log(error)
        }
        // console.log(' >>>>>>> data ', data);
        const total: number = await this.placeService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        return {
            _pagination: { total, totalPage, currentPage: _offset },
            data
        };
    }

}
