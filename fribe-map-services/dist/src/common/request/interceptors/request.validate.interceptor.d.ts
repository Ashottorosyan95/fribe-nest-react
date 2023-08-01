import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class ValidateCredentialsInterceptor implements NestInterceptor {
    private readonly serviceType;
    private readonly authServiceUrl;
    constructor(serviceType: string);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
