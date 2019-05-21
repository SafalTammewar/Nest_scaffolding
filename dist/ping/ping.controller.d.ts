import { AppService } from '../service/app.service';
import { LogService } from '../service/logger.service';
export declare class PingController {
    private logger;
    private appService;
    MODULENAME: string;
    constructor(logger: LogService, appService: AppService);
    ping(req: any, res: any): any;
}
