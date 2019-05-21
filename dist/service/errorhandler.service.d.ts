import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { AppService } from './app.service';
import { LogService } from '../service/logger.service';
export declare class ErrorFilter implements ExceptionFilter {
    private logger;
    private appService;
    MODULENAME: string;
    response: any;
    request: any;
    constructor(logger: LogService, appService: AppService);
    catch(error: Error, host: ArgumentsHost): Promise<any>;
}
