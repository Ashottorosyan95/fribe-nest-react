import {
    Body,
    Controller,
    InternalServerErrorException,
    Post,
    UploadedFile,
    UseInterceptors,
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
import { UploadPlaceDataDoc } from '../docs/place.doc';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';

@ApiTags('modules.admin.place')
@Controller({
    version: '1',
    path: '/place',
})
export class PlaceAdminController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly placeService: PlaceService
    ) {}

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
            await this.placeService.addPlacesData(records);

            return {
                data: {messgae: 'Data uploaded successfully' },
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
}
