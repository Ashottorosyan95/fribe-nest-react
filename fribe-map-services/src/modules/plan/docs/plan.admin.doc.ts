import { HttpStatus, applyDecorators } from '@nestjs/common';
import { Doc, DocPaging } from 'src/common/doc/decorators/doc.decorator';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import { PlanListSerialization } from '../serializations/plan.list.serialization';
import {
    PLAN_DEFAULT_AVAILABLE_SEARCH,
    PLAN_DEFAULT_AVAILABLE_SORT,
} from '../constants/plan.list.constants';
import { PlanGetSerialization } from '../serializations/plan.get.serialization';

export function PlanListDoc(): MethodDecorator {
    return applyDecorators(
        DocPaging<PlanListSerialization>('plan.list', {
            auth: {
                jwtAccessToken: true,
                // permissionToken: true,
            },
            request: {
                // queries: [...RoleDocQueryIsActive, ...RoleDocQueryAccessFor],
            },
            response: {
                serialization: PlanListSerialization,
                // _availableSort: PLAN_DEFAULT_AVAILABLE_SORT,
                // _availableSearch: PLAN_DEFAULT_AVAILABLE_SEARCH,
            },
        })
    );
}

export function PlaGetDoc(): MethodDecorator {
    return applyDecorators(
        Doc<PlanGetSerialization>('plan.get', {
            auth: {
                jwtAccessToken: true,
                // permissionToken: true,
            },
            request: {
                // params: RoleDocParamsGet,
            },
            response: { serialization: PlanGetSerialization },
        })
    );
}

export function PlanCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc<ResponseIdSerialization>('plan.create', {
            auth: {
                jwtAccessToken: true,
                // permissionToken: true,
            },
            response: {
                httpStatus: HttpStatus.CREATED,
                serialization: ResponseIdSerialization,
            },
        })
    );
}
