import { Repository } from 'typeorm';
import { userEntity } from './entity/user.entity';
import { LogService } from '../../service/logger.service';
export declare class UsersService {
    private readonly userRepository;
    private logger;
    MODULENAME: string;
    constructor(userRepository: Repository<userEntity>, logger: LogService);
    createUser(evUniqueID: any, data: any): Promise<any>;
    getUserList(evUniqueID: any): Promise<userEntity[]>;
    getUser(evUniqueID: any, userid: any): Promise<userEntity>;
    deleteUser(evUniqueID: any, userid: any): Promise<import("typeorm").DeleteResult>;
    editPost(evUniqueID: any, data: any): Promise<import("typeorm").UpdateResult>;
    registerUsers(evUniqueID: any, data: any): Promise<userEntity>;
    getUserData(evUniqueID: any): Promise<any>;
}
