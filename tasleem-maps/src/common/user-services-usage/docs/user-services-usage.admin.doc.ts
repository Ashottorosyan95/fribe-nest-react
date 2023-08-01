import { HttpStatus, applyDecorators } from "@nestjs/common";
import { Doc } from "src/common/doc/decorators/doc.decorator";
import { ResponseIdSerialization } from "src/common/response/serializations/response.id.serialization";

export function UserServicesUsageCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc<ResponseIdSerialization>('user-services-usage.create', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.CREATED,
                serialization: ResponseIdSerialization,
            },
        })
    );
}