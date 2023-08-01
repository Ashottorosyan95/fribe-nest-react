import { HttpStatus, applyDecorators } from '@nestjs/common';
import { Doc, DocPaging } from 'src/common/doc/decorators/doc.decorator';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import { ServiceListSerialization } from '../serializations/service.list.serialization';
import {
    SERVICE_DEFAULT_AVAILABLE_SEARCH,
    SERVICE_DEFAULT_AVAILABLE_SORT,
} from '../constants/service.list.constants';
import { ServiceGetSerialization } from '../serializations/service.get.serialization';

export function ServiceListDoc(): MethodDecorator {
    return applyDecorators(
        DocPaging<ServiceListSerialization>('service.list', {
            auth: {
                jwtAccessToken: true,
                // permissionToken: true,
            },
            request: {
                // queries: [...RoleDocQueryIsActive, ...RoleDocQueryAccessFor],
            },
            response: {
                serialization: ServiceListSerialization,
                // _availableSort: SERVICE_DEFAULT_AVAILABLE_SORT,
                // _availableSearch: SERVICE_DEFAULT_AVAILABLE_SEARCH,
            },
        })
    );
}

export function ServiceGetDoc(): MethodDecorator {
    return applyDecorators(
        Doc<ServiceGetSerialization>('service.get', {
            auth: {
                jwtAccessToken: true,
                // permissionToken: true,
            },
            request: {
                // params: RoleDocParamsGet,
            },
            response: { serialization: ServiceGetSerialization },
        })
    );
}

export function ServiceCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc<ResponseIdSerialization>('service.create', {
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
