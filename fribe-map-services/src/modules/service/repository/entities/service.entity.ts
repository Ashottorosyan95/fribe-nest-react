import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { CallbackWithoutResultAndOptionalError } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';
import { ulid } from 'ulid'

export const ServiceDatabaseName = 'services';

@DatabaseEntity({ collection: ServiceDatabaseName })
export class ServiceEntity extends DatabaseMongoUUIDEntityAbstract {

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
        required: true,
        lowercase: true,
        trim: true,
        type: String,
        maxlength: 250,
    })
    description: string;

    @Prop({
        required: true,
        index: true,
        trim: true,
        enum: ENUM_SERVICE,
        type: String,
    })
    type: ENUM_SERVICE;

}

export const ServiceSchema = SchemaFactory.createForClass(ServiceEntity);
export type ServiceDoc = ServiceEntity & Document;

ServiceSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    this.shortId = ulid();
    next();
});
