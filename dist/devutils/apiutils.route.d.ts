import { LogService } from '../service/logger.service';
import { AppService } from "../service/app.service";
import { UsersService } from "./users/users.service";
export declare class ApiUtils {
    private logger;
    private appService;
    private userService;
    MODULENAME: string;
    constructor(logger: LogService, appService: AppService, userService: UsersService);
    authToken(req: any, res: any): void;
    encodeJWT(req: any, res: any): Promise<void>;
}
