import { GeneralCodes } from './general.errocodes.config';
import { errorCodes } from './interface/errorcode.interface';
import { LogService } from '../service/logger.service';
export declare class ErrorcodesService {
    private logger;
    private generalcodes;
    MODULENAME: string;
    constructor(logger: LogService, generalcodes: GeneralCodes);
    getErrorInformation(evUniqueID: any, errCode: any, errMsg: any): errorCodes;
}
