import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { tap } from 'rxjs/operators';
import authConfig from 'src/configs/auth.config';

@Injectable()
export class ValidateCredentialsInterceptor implements NestInterceptor {
    private readonly serviceType: string;
    private readonly authServiceUrl: string;
    constructor(
        serviceType: string,
    ) {
        this.authServiceUrl = authConfig().authServiceUrl
        this.serviceType = serviceType
    }
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        let req = context.switchToHttp().getRequest()
        let publishableKey = req.query.publishableKey ? req.query.publishableKey : req.body.publishableKey
        let clientId = req.query.clientId ? req.query.clientId : req.body.clientId
        if (!publishableKey || !clientId) {
            return throwError(() => new BadRequestException())
        }

        try {
            let response = await axios.post(`${this.authServiceUrl}/api/v1/public/user/validatePublishableKey`, { publishableKey, serviceType: this.serviceType })
            if (response.data) {
                return next.handle()
            } else {
                return throwError(() => new BadRequestException("Unable to validate your request at this time."))
            }
        } catch (error) {
            console.log(error.response.data.message)
            return throwError(() => new BadRequestException(error?.response?.data?.message))
        }

    }
}