import { NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { LogService } from '../service/logger.service';
export declare class AuthMiddleware implements NestMiddleware {
    private logger;
    MODULENAME: string;
    constructor(logger: LogService);
    resolve(...args: any[]): MiddlewareFunction;
}
