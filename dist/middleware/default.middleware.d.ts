import { NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { apiResponse } from '../interfaces/metadata.interface';
import { LogService } from '../service/logger.service';
export declare class DefaultMiddleware implements NestMiddleware {
    private logger;
    MODULENAME: string;
    apiResp: apiResponse;
    constructor(logger: LogService);
    hashAPIServer(evUniqueID: any): string;
    resolve(): MiddlewareFunction;
}
