import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { CallbackWithoutResultAndOptionalError } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { ENUM_SERVICE } from 'src/modules/service/constants/service.enum.constant';
import { ServiceEntity } from 'src/modules/service/repository/entities/service.entity';
import { ulid } from 'ulid'
import { ENUM_PLAN_TIME_WINDOW } from '../../constants/plan.time-window.constant';

export const PlanDatabaseName = 'plans';

@DatabaseEntity({ collection: PlanDatabaseName })
export class PlanEntity extends DatabaseMongoUUIDEntityAbstract {

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

    // @Prop({
    //     required: true,
    //     index: true,
    //     trim: true,
    //     enum: ENUM_SERVICE,
    //     type: Array<string>,
    // })
    // services: ENUM_SERVICE[];

    @Prop({
        required: true,
        default: [],
        _id: false,
        type: Array<string>,
        ref: ServiceEntity.name,
    })
    services: string[];


    @Prop({
        required: true,
        type: Number,
    })
    requestLimit: number;

    @Prop({
        required: true,
        index: true,
        trim: true,
        enum: ENUM_PLAN_TIME_WINDOW,
        type: String,
    })
    timeWindow: ENUM_PLAN_TIME_WINDOW;

    @Prop({
        required: true,
        type: Number,
    })
    price: number;

}

export const PlanSchema = SchemaFactory.createForClass(PlanEntity);
export type PlanDoc = PlanEntity & Document;

PlanSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    this.shortId = ulid();
    next();
});
