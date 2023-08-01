import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CallbackWithoutResultAndOptionalError, Types } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';
import { ulid } from 'ulid'
import { PlaceLocation } from '../../serializations/place-location.serialization';

export const PlacesDatabaseName = 'places';

@DatabaseEntity({ collection: PlacesDatabaseName })
export class PlaceEntity extends DatabaseMongoUUIDEntityAbstract {

    @Prop({
        type: String,
        maxlength: 50,
        index: true,
    })
    shortId: string;

    @Prop({
        required: true,
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 50,
    })
    name: string;

    @Prop({
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 500,
    })
    formattedAddress: string;


    @Prop({
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 50,
    })
    city: string;


    @Prop({
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 50,
    })
    country: string;

    @Prop({
        _id: false,
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],  // [<long>,<lat>]
            required: true,
            default: [0,0]
        }
    })
    location: PlaceLocation;



    @Prop({
        _id: false,
        type: {},
        default: null
    })
    additionalInfo: any

}

export const PlaceSchema = SchemaFactory.createForClass(PlaceEntity);

PlaceSchema.index({ name: 'text' , formattedAddress: 'text' , city : 'text'}); // enable fully search
PlaceSchema.index({ location : "2dsphere" });



PlaceSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    this.shortId = ulid();
    next();
});
