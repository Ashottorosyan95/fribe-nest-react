import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ResponseApiKeysSerialization {
    @ApiProperty({
        description: 'Secret key',
        example: 'f68b69b3551ca21aa9d1cd9ddb8c35f9db226e7c3845afba99c6e64f7e24a257',
        required: true,
    })
    @Type(() => String)
    secretKey: string;


    @ApiProperty({
        description: 'Publishable key',
        example: '01H4QE1FC3AMWC7ES3J52WD49G',
        required: true,
    })
    @Type(() => String)
    publishableKey: string;
}
