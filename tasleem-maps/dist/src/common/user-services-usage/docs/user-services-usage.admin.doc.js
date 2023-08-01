"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServicesUsageCreateDoc = void 0;
const common_1 = require("@nestjs/common");
const doc_decorator_1 = require("../../doc/decorators/doc.decorator");
const response_id_serialization_1 = require("../../response/serializations/response.id.serialization");
function UserServicesUsageCreateDoc() {
    return (0, common_1.applyDecorators)((0, doc_decorator_1.Doc)('user-services-usage.create', {
        auth: {
            jwtAccessToken: true,
        },
        response: {
            httpStatus: common_1.HttpStatus.CREATED,
            serialization: response_id_serialization_1.ResponseIdSerialization,
        },
    }));
}
exports.UserServicesUsageCreateDoc = UserServicesUsageCreateDoc;
//# sourceMappingURL=user-services-usage.admin.doc.js.map