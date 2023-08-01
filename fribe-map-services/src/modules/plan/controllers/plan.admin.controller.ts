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
import {
    PlaGetDoc,
    PlanCreateDoc,
    PlanListDoc,
} from 'src/modules/plan/docs/plan.admin.doc';
import { AuthJwtAdminAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
import {
    IResponse,
    IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { PlanCreateDto } from '../dtos/plan.create.dto';
import {
    Response,
    ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import { PlanService } from '../services/plan.service';
import { ENUM_PLAN_STATUS_CODE_ERROR } from '../constants/plan.status-code.constant';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator';
import {
    PLAN_DEFAULT_AVAILABLE_SEARCH,
    PLAN_DEFAULT_AVAILABLE_SORT,
    PLAN_DEFAULT_PER_PAGE,
    PLAN_DEFAULT_SORT,
} from '../constants/plan.list.constants';
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto';
import { PlanEntity } from '../repository/entities/plan.entity';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { PlanListSerialization } from '../serializations/plan.list.serialization';
import { PlanGetSerialization } from '../serializations/plan.get.serialization';

@ApiTags('modules.admin.plan')
@Controller({
    version: '1',
    path: '/plans',
})
export class PlanAdminController {
    constructor(
        private readonly planService: PlanService,
        private readonly paginationService: PaginationService
    ) {}

    @PlanCreateDoc()
    @Response('plan.create', {
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
        body: PlanCreateDto
    ): Promise<IResponse> {
        try {
            const planExist = await this.planService.findOne({
                name: body.name.toLowerCase(),
            });

            if (planExist) {
                throw new ConflictException({
                    statusCode:
                        ENUM_PLAN_STATUS_CODE_ERROR.PLAN_NAME_EXISTS_ERROR,
                    message: 'plan.error.usernameExist',
                });
            }

            const create = await this.planService.create(body);

            return {
               data: {
                _id: create._id,
               }
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

    // @PlanListDoc()
    // @ResponsePaging('plan.list', {
    //     serialization: PlanListSerialization,
    // })
    // // @AuthPermissionProtected(
    // //     ENUM_AUTH_PERMISSIONS.PLAN_READ
    // // )
    // @AuthJwtAdminAccessProtected()
    // @Get('/list')
    // async list(
    //     @PaginationQuery(
    //         PLAN_DEFAULT_PER_PAGE,
    //         PLAN_DEFAULT_AVAILABLE_SEARCH,
    //         PLAN_DEFAULT_SORT,
    //         PLAN_DEFAULT_AVAILABLE_SORT
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

    //     const roles: PlanEntity[] = await this.planService.findAll(find, {
    //         paging: {
    //             limit: perPage,
    //             offset: _offset,
    //         },
    //         sort: _sort,
    //     });

    //     const totalData: number = await this.planService.getTotal({});
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
    //         data: roles,
    //     };
    // }



    @PlaGetDoc()
    @Response('plan.get', {
        serialization: PlanGetSerialization,
    })
    // @AuthPermissionProtected(ENUM_AUTH_PERMISSIONS.ROLE_READ)
    @AuthJwtAdminAccessProtected()
    @Get('get/:id')
    async get(@Param('id') id: string): Promise<IResponse> {
        return await this.planService.findOneById(id)
    }
}
