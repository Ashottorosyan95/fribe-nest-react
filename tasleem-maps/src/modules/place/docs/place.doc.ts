import { HttpStatus, applyDecorators } from '@nestjs/common';
import { Doc } from 'src/common/doc/decorators/doc.decorator';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import { PlaceGetSerialization } from '../serializations/place.get.serialization';
import {
    PlaceDocQueryNearbySearch,
    PlaceDocQuerySearchFromText,
    PlaceUploadData,
} from '../constants/place.doc.constant';
import { PlaceListSerialization } from '../serializations/place.list.serialization';
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/constants/doc.enum.constant';
// import { PermissionListSerialization } from 'src/modules/permission/serializations/permission.list.serialization';

export function PlaceCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc<ResponseIdSerialization>('place.create', {
            auth: {
                jwtAccessToken: true,
                // permissionToken: true,
            },
            request: {
                queries: [...PlaceDocQuerySearchFromText],
            },

            response: {
                httpStatus: HttpStatus.CREATED,
                serialization: ResponseIdSerialization,
            },
        })
    );
}




export function PlaceListDoc(): MethodDecorator {
    return applyDecorators(
        Doc<any>('permission.list', {
            auth: {
                jwtAccessToken: true,
                // permissionToken: true,
            },
            request: {
                queries: [...PlaceDocQuerySearchFromText],
            },
            response: {
                serialization: Array<any>,
            },
        })
    );
}



/* single */
export function PlaceGetDoc(): MethodDecorator {
    return applyDecorators(
        Doc<PlaceGetSerialization>('place.get', {
            auth: {
                jwtAccessToken: true,
                // permissionToken: true,
            },
            request: {
                queries: [...PlaceDocQuerySearchFromText],
            },
            response: { serialization: PlaceGetSerialization },
        })
    );
}

export function PlaceFindNearbySearchDoc(): MethodDecorator {
    return applyDecorators(
        Doc<PlaceGetSerialization>('place.nearbysearch', {
            auth: {
                jwtAccessToken: true,
                // permissionToken: true,
            },
            request: {
                queries: [...PlaceDocQueryNearbySearch],
            },
            response: { serialization: PlaceListSerialization },
        })
    );
}



export function UploadPlaceDataDoc(): MethodDecorator {
    return applyDecorators(
        Doc<any>('place.uploadexcel-data', {
            auth: {
                jwtAccessToken: true,
                // permissionToken: true,
            },
            request: {
                bodyType:  ENUM_DOC_REQUEST_BODY_TYPE.FORM_DATA
            },
            // response: { serialization: any },
        })
    );
}
