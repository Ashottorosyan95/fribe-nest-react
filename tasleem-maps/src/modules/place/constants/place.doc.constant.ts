


export const PlaceDocQuerySearchFromText= [
    {
        name: 'search',
        allowEmptyValue: false,
        required: true,
        type: 'string',
        example: 'abc plaza',
    },
];



export const PlaceDocQueryNearbySearch = [
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


export const PlaceUploadData = [
    {
        name: 'file',
        allowEmptyValue: false,
        type: 'string',
        format: 'binary',
        required: true,
    }

]