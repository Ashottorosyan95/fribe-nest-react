"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanCreateDoc = exports.PlaGetDoc = exports.PlanListDoc = void 0;
const common_1 = require("@nestjs/common");
const doc_decorator_1 = require("../../../common/doc/decorators/doc.decorator");
const response_id_serialization_1 = require("../../../common/response/serializations/response.id.serialization");
const plan_list_serialization_1 = require("../serializations/plan.list.serialization");
const plan_get_serialization_1 = require("../serializations/plan.get.serialization");
function PlanListDoc() {
    return (0, common_1.applyDecorators)((0, doc_decorator_1.DocPaging)('plan.list', {
        auth: {
            jwtAccessToken: true,
        },
        request: {},
        response: {
            serialization: plan_list_serialization_1.PlanListSerialization,
        },
    }));
}
exports.PlanListDoc = PlanListDoc;
function PlaGetDoc() {
    return (0, common_1.applyDecorators)((0, doc_decorator_1.Doc)('plan.get', {
        auth: {
            jwtAccessToken: true,
        },
        request: {},
        response: { serialization: plan_get_serialization_1.PlanGetSerialization },
    }));
}
exports.PlaGetDoc = PlaGetDoc;
function PlanCreateDoc() {
    return (0, common_1.applyDecorators)((0, doc_decorator_1.Doc)('plan.create', {
        auth: {
            jwtAccessToken: true,
        },
        response: {
            httpStatus: common_1.HttpStatus.CREATED,
            serialization: response_id_serialization_1.ResponseIdSerialization,
        },
    }));
}
exports.PlanCreateDoc = PlanCreateDoc;
//# sourceMappingURL=plan.admin.doc.js.map