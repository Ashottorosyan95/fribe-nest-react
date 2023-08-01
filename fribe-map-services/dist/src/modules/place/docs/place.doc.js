"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLocationWithLatLongDoc = exports.TextSearchDoc = exports.AddLocation = exports.UploadPlaceDataDoc = exports.PlaceFindNearbySearchDoc = exports.PlaceGetDoc = exports.PlaceListDoc = exports.PlaceCreateDoc = void 0;
const common_1 = require("@nestjs/common");
const doc_decorator_1 = require("../../../common/doc/decorators/doc.decorator");
const response_id_serialization_1 = require("../../../common/response/serializations/response.id.serialization");
const place_get_serialization_1 = require("../serializations/place.get.serialization");
const place_doc_constant_1 = require("../constants/place.doc.constant");
const place_list_serialization_1 = require("../serializations/place.list.serialization");
const doc_enum_constant_1 = require("../../../common/doc/constants/doc.enum.constant");
function PlaceCreateDoc() {
    return (0, common_1.applyDecorators)((0, doc_decorator_1.Doc)('place.create', {
        auth: {
            jwtAccessToken: true,
        },
        request: {
            queries: [...place_doc_constant_1.PlaceDocQuerySearchFromText],
        },
        response: {
            httpStatus: common_1.HttpStatus.CREATED,
            serialization: response_id_serialization_1.ResponseIdSerialization,
        },
    }));
}
exports.PlaceCreateDoc = PlaceCreateDoc;
function PlaceListDoc() {
    return (0, common_1.applyDecorators)((0, doc_decorator_1.Doc)('permission.list', {
        auth: {
            jwtAccessToken: true,
        },
        request: {
            queries: [...place_doc_constant_1.PlaceDocQuerySearchFromText],
        },
        response: {
            serialization: (Array),
        },
    }));
}
exports.PlaceListDoc = PlaceListDoc;
function PlaceGetDoc() {
    return (0, common_1.applyDecorators)((0, doc_decorator_1.Doc)('place.get', {
        auth: {
            jwtAccessToken: true,
        },
        request: {
            queries: [...place_doc_constant_1.PlaceDocQuerySearchFromText],
        },
        response: { serialization: place_get_serialization_1.PlaceGetSerialization },
    }));
}
exports.PlaceGetDoc = PlaceGetDoc;
function PlaceFindNearbySearchDoc() {
    return (0, common_1.applyDecorators)((0, doc_decorator_1.Doc)('place.nearbysearch', {
        auth: {
            jwtAccessToken: true,
        },
        request: {
            queries: [...place_doc_constant_1.PlaceDocQueryNearbySearch],
        },
        response: { serialization: place_list_serialization_1.PlaceListSerialization },
    }));
}
exports.PlaceFindNearbySearchDoc = PlaceFindNearbySearchDoc;
function UploadPlaceDataDoc() {
    return (0, common_1.applyDecorators)((0, doc_decorator_1.Doc)('place.uploadexcel-data', {
        auth: {
            jwtAccessToken: true,
        },
        request: {
            bodyType: doc_enum_constant_1.ENUM_DOC_REQUEST_BODY_TYPE.FORM_DATA
        },
    }));
}
exports.UploadPlaceDataDoc = UploadPlaceDataDoc;
function AddLocation() {
    return (0, common_1.applyDecorators)((0, doc_decorator_1.Doc)('place.addLocation', {
        auth: {
            jwtAccessToken: true,
        },
        request: {
            bodyType: doc_enum_constant_1.ENUM_DOC_REQUEST_BODY_TYPE.JSON
        },
    }));
}
exports.AddLocation = AddLocation;
function TextSearchDoc() {
    return (0, common_1.applyDecorators)((0, doc_decorator_1.Doc)('place.textsearch', {
        auth: {
            jwtAccessToken: true,
        },
        request: {
            queries: [...place_doc_constant_1.PlaceDocQueryTextSearch],
        },
        response: { serialization: place_list_serialization_1.PlaceListSerialization },
    }));
}
exports.TextSearchDoc = TextSearchDoc;
function GetLocationWithLatLongDoc() {
    return (0, common_1.applyDecorators)((0, doc_decorator_1.Doc)('place.GetLocationLatLong', {
        auth: {
            jwtAccessToken: true,
        },
        request: {
            queries: [...place_doc_constant_1.GetLocationWithLatLongQuery],
        },
        response: {},
    }));
}
exports.GetLocationWithLatLongDoc = GetLocationWithLatLongDoc;
//# sourceMappingURL=place.doc.js.map