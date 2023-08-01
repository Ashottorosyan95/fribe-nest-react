import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { Document } from 'mongoose';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';

export const UserServicesUsageDatabaseName = 'user_services_usage';

@DatabaseEntity({ collection: UserServicesUsageDatabaseName })
export class UserServicesUsageEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        index: true,
        type: String,
    })
    userId: string;

    @Prop({
        required: true,
        type: String,
    })
    serviceId: string;

    @Prop({
        required: true,
        type: String,
        enum: ENUM_SERVICE,
    })
    serviceType: ENUM_SERVICE;

    @Prop({
        required: true,
        index: true,
        type: Date,
    })
    createdAt: Date;

    @Prop({
        required: true,
        type: Date,
    })
    updatedAt: Date;
}

export const UserServicesUsageSchema = SchemaFactory.createForClass(UserServicesUsageEntity);

export type UserServicesUsageDoc = UserServicesUsageEntity & Document;
