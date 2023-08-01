"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCreateDoc = exports.ServiceGetDoc = exports.ServiceListDoc = void 0;
const common_1 = require("@nestjs/common");
const doc_decorator_1 = require("../../../common/doc/decorators/doc.decorator");
const response_id_serialization_1 = require("../../../common/response/serializations/response.id.serialization");
const service_list_serialization_1 = require("../serializations/service.list.serialization");
const service_get_serialization_1 = require("../serializations/service.get.serialization");
function ServiceListDoc() {
    return (0, common_1.applyDecorators)((0, doc_decorator_1.DocPaging)('service.list', {
        auth: {
            jwtAccessToken: true,
        },
        request: {},
        response: {
            serialization: service_list_serialization_1.ServiceListSerialization,
        },
    }));
}
exports.ServiceListDoc = ServiceListDoc;
function ServiceGetDoc() {
    return (0, common_1.applyDecorators)((0, doc_decorator_1.Doc)('service.get', {
        auth: {
            jwtAccessToken: true,
        },
        request: {},
        response: { serialization: service_get_serialization_1.ServiceGetSerialization },
    }));
}
exports.ServiceGetDoc = ServiceGetDoc;
function ServiceCreateDoc() {
    return (0, common_1.applyDecorators)((0, doc_decorator_1.Doc)('service.create', {
        auth: {
            jwtAccessToken: true,
        },
        response: {
            httpStatus: common_1.HttpStatus.CREATED,
            serialization: response_id_serialization_1.ResponseIdSerialization,
        },
    }));
}
exports.ServiceCreateDoc = ServiceCreateDoc;
//# sourceMappingURL=service.admin.doc.js.map