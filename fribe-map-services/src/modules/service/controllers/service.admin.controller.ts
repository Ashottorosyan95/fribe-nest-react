import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Put,
    InternalServerErrorException,
    NotFoundException,
    UploadedFile,
    ConflictException,
    Patch,
    HttpCode,
    HttpStatus,
    Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import { AuthJwtAdminAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
import {
    IResponse,
    IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { ServiceCreateDto } from 'src/modules/service/dtos/service.create.dto';
import {
    Response,
    ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import { ServiceService } from 'src/modules/service/services/service.service';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator';
import {
    SERVICE_DEFAULT_AVAILABLE_SEARCH,
    SERVICE_DEFAULT_AVAILABLE_SORT,
    SERVICE_DEFAULT_PER_PAGE,
    SERVICE_DEFAULT_SORT,
} from 'src/modules/service/constants/service.list.constants';
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto';
import { ServiceEntity } from 'src/modules/service/repository/entities/service.entity';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { ServiceListSerialization } from 'src/modules/service/serializations/service.list.serialization';
import { ServiceGetSerialization } from 'src/modules/service/serializations/service.get.serialization';
import {
    ServiceCreateDoc,
    ServiceGetDoc,
    ServiceListDoc,
} from 'src/modules/service/docs/service.admin.doc';

@ApiTags('modules.admin.service')
@Controller({
    version: '1',
    path: '/services',
})
export class ServiceAdminController {
    constructor(
        private readonly serviceService: ServiceService,
        private readonly paginationService: PaginationService
    ) {}

    @ServiceCreateDoc()
    @Response('service.create', {
        serialization: ResponseIdSerialization,
    })
    // @AuthPermissionProtected(
    //     ENUM_AUTH_PERMISSIONS.PLAN_CREATE,
    //     ENUM_AUTH_PERMISSIONS.PLAN_READ
    // )
    @AuthJwtAdminAccessProtected()
    @Post('/create')
    async create(
        @Body()
        body: ServiceCreateDto
    ): Promise<IResponse> {
        try {
            const reocrdExist = await this.serviceService.findOne({
                name: body.name.toLowerCase(),
            });

            if (reocrdExist) {
                throw new ConflictException({
                    statusCode:
                        ENUM_ERROR_STATUS_CODE_ERROR.ERROR_RECORD_ALREADY_EXIST,
                    message: 'service.error.usernameExist',
                });
            }

            const create = await this.serviceService.create(body);

            return {
                data: { _id: create._id, }
            };
        } catch (err) {
            console.log(err);

            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }
    }

    // @ServiceListDoc()
    // @ResponsePaging('service.list', {
    //     serialization: ServiceListSerialization,
    // })
    // // @AuthPermissionProtected(
    // //     ENUM_AUTH_PERMISSIONS.PLAN_READ
    // // )
    // @AuthJwtAdminAccessProtected()
    // @Get('/list')
    // async list(
    //     @PaginationQuery(
    //         SERVICE_DEFAULT_PER_PAGE,
    //         SERVICE_DEFAULT_AVAILABLE_SEARCH,
    //         SERVICE_DEFAULT_SORT,
    //         SERVICE_DEFAULT_AVAILABLE_SORT
    //     )
    //     {
    //         page,
    //         perPage,
    //         _sort,
    //         _offset,
    //         _search,
    //         _availableSort,
    //         _availableSearch,
    //     }: PaginationListDto
    // ): Promise<IResponsePaging> {
    //     const find: Record<string, any> = {
    //         ..._search,
    //     };

    //     const list: ServiceEntity[] = await this.serviceService.findAll(find, {
    //         paging: {
    //             limit: perPage,
    //             offset: _offset,
    //         },
    //         sort: _sort,
    //     });

    //     const totalData: number = await this.serviceService.getTotal({});
    //     const totalPage: number = this.paginationService.totalPage(
    //         totalData,
    //         perPage
    //     );

    //     return {
    //         totalData,
    //         totalPage,
    //         currentPage: page,
    //         perPage,
    //         _availableSearch,
    //         _availableSort,
    //         data: list,
    //     };
    // }

    @ServiceGetDoc()
    @Response('service.get', {
        serialization: ServiceGetSerialization,
    })
    // @AuthPermissionProtected(ENUM_AUTH_PERMISSIONS.ROLE_READ)
    @AuthJwtAdminAccessProtected()
    @Get('get/:id')
    async get(@Param('id') id: string): Promise<IResponse> {
        return await this.serviceService.findOneById(id);
    }
}
