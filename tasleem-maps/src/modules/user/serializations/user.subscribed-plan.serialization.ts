import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UserServiceUsage {
    @ApiProperty({})
    @Type(() => String)
    serviceId: string;

    @ApiProperty({})
    @Type(() => String)
    serviceName: string;

    @ApiProperty({})
    @Type(() => Number)
    usageCount: number;
}

export class UserSubscribedPlan {
    @ApiProperty({})
    @Type(() => String)
    planId: string;

    @ApiProperty({
        type: UserServiceUsage,
        isArray: true,
    })
    @Type(() => String)
    services: UserServiceUsage[];
}
