import { UserPostDTO } from './dto/user.post.dto';
import { UsersService } from './users.service';
import { AppService } from '../../service/app.service';
import { LogService } from '../../service/logger.service';
export declare class UsersController {
    private userService;
    private Logger;
    private appService;
    MODULENAME: string;
    constructor(userService: UsersService, Logger: LogService, appService: AppService);
    addPost(req: any, res: any, userpostdto: UserPostDTO): Promise<any>;
    getUserList(req: any, res: any): Promise<any>;
    getUser(req: any, res: any, userID: any): Promise<any>;
    deleteUser(req: any, res: any, userID: any): Promise<any>;
    updateUser(req: any, res: any, userPostDTO: UserPostDTO): Promise<any>;
    addPosts(res: any, req: any, userpostdto: UserPostDTO): Promise<any>;
    getUserLists(req: any, res: any): Promise<any>;
}
