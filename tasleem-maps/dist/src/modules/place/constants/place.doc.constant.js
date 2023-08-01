"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceUploadData = exports.PlaceDocQueryNearbySearch = exports.PlaceDocQuerySearchFromText = void 0;
exports.PlaceDocQuerySearchFromText = [
    {
        name: 'search',
        allowEmptyValue: false,
        required: true,
        type: 'string',
        example: 'abc plaza',
    },
];
exports.PlaceDocQueryNearbySearch = [
    {
        name: 'name',
        allowEmptyValue: true,
        required: false,
        type: 'string',
        example: 'abc plaza',
    },
    {
        name: 'radius',
        allowEmptyValue: true,
        required: false,
        type: 'number',
        example: '10000',
    },
    {
        name: 'location',
        allowEmptyValue: false,
        required: true,
        type: 'string',
        example: '10.9022,-19.4552',
    },
];
exports.PlaceUploadData = [
    {
        name: 'file',
        allowEmptyValue: false,
        type: 'string',
        format: 'binary',
        required: true,
    }
];
//# sourceMappingURL=place.doc.constant.js.map