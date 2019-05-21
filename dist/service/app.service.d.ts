import { apiResponse } from '../interfaces/metadata.interface';
import { ErrorcodesService } from '../errorcodes/errorcodes.service';
import { LogService } from './logger.service';
export declare class AppService {
    private logger;
    private errorService;
    MODULENAME: string;
    constructor(logger: LogService, errorService: ErrorcodesService);
    endMetaData(evUniqueID: any, errCode: any, errMsg: any, metadata: apiResponse, task: any): apiResponse;
    generateJWT(evUniqueID: any, data: any): Promise<string>;
    generateJWTManual(evUniqueID: any, payload: any): string;
    cleanUpJWTManual(evUniqueID: any, val: any): any;
}
