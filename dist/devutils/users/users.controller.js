"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_post_dto_1 = require("./dto/user.post.dto");
const users_service_1 = require("./users.service");
const user_entity_1 = require("./entity/user.entity");
const app_service_1 = require("../../service/app.service");
const logger_service_1 = require("../../service/logger.service");
let UsersController = class UsersController {
    constructor(userService, Logger, appService) {
        this.userService = userService;
        this.Logger = Logger;
        this.appService = appService;
        this.MODULENAME = 'UsersController';
    }
    addPost(req, res, userpostdto) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'Create User';
            const httpCode = 200;
            try {
                this.Logger.debug(`[${req.evUniqueID}] (${this.MODULENAME}) - ${taskName} - QueryData: ${JSON.stringify(req.body)}`);
                let userpost = new user_entity_1.userEntity();
                userpost.username = userpostdto.username;
                userpost.email = userpostdto.email;
                userpost.mobile = userpostdto.mobile;
                userpost.password = userpostdto.password;
                userpost.address = userpostdto.address;
                let checkerror = yield class_validator_1.validate(userpost);
                if (checkerror.length > 0) {
                    let value = checkerror.map(data => data.constraints.length || data.constraints.isEmail || data.constraints.isNotEmpty);
                    throw new Error(value[0]);
                }
                else {
                    const task = {
                        name: taskName,
                        info: "Add user details",
                        elapsedTimeInMs: Date.now()
                    };
                    const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'Post has been submitted successfully!', req.metadata, task);
                    const newPost = yield this.userService.createUser(req.evUniqueID, userpostdto);
                    return res.status(httpCode).json({
                        metadata: usermetadata,
                        post: newPost,
                    });
                }
            }
            catch (error) {
                this.Logger.error(`[${req.evUniqueID}] (${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
                this.Logger.debug(`[${req.evUniqueID}] (${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);
                throw error;
            }
        });
    }
    getUserList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'get user list';
            const httpCode = 200;
            try {
                this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - QueryData: ${"-"}`);
                const task = {
                    name: taskName,
                    info: "Get user list",
                    elapsedTimeInMs: Date.now()
                };
                const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'Fetch User List successfully', req.metadata, task);
                const userlist = yield this.userService.getUserList(req.evUniqueID);
                if (userlist == undefined) {
                    throw new Error(`Users are not found plz try again !!!`);
                }
                return res.status(httpCode).json({
                    metadata: usermetadata,
                    list: userlist,
                });
            }
            catch (error) {
                this.Logger.error(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
                this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);
                throw error;
            }
        });
    }
    getUser(req, res, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'getUser';
            const httpCode = 200;
            try {
                this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - QueryData: ${userID}`);
                const task = {
                    name: taskName,
                    info: "Get user list",
                    elapsedTimeInMs: Date.now()
                };
                const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'Fetch user info successfully', req.metadata, task);
                const user = yield this.userService.getUser(req.evUniqueID, userID);
                if (user == undefined) {
                    throw new Error(`Username is not found plz try again !!!`);
                }
                return res.status(httpCode).json({
                    metadata: usermetadata,
                    UserDetails: user,
                });
            }
            catch (error) {
                this.Logger.error(`[${req.evUniqueID}](${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
                this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);
                throw error;
            }
        });
    }
    deleteUser(req, res, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'deleteUser';
            const httpCode = 200;
            try {
                this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME}) - ${taskName} - QueryData: ${userID}`);
                const task = {
                    name: taskName,
                    info: "Delete user according to user id",
                    elapsedTimeInMs: Date.now()
                };
                const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'User deleted successfully', req.metadata, task);
                const user = yield this.userService.deleteUser(req.evUniqueID, userID);
                if (user.affected == 0) {
                    throw new Error(`Username is not found plz try again !!!`);
                }
                return res.status(httpCode).json({
                    metadata: usermetadata,
                    data: user
                });
            }
            catch (error) {
                this.Logger.error(`[${req.evUniqueID}](${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
                this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);
                throw error;
            }
        });
    }
    updateUser(req, res, userPostDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'updateUser';
            const httpCode = 200;
            try {
                this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME} )- ${taskName} - QueryData: ${JSON.stringify(req.body)}`);
                const task = {
                    name: taskName,
                    info: "Update the user details",
                    elapsedTimeInMs: Date.now()
                };
                const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'user has been updated successfully', req.metadata, task);
                const editPost = yield this.userService.editPost(req.evUniqueID, userPostDTO);
                if (editPost == undefined) {
                    throw new Error(`Username is not found plz try again !!!`);
                }
                return res.status(httpCode).json({
                    metadata: usermetadata,
                    details: editPost
                });
            }
            catch (error) {
                this.Logger.error(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
                this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);
                throw error;
            }
        });
    }
    addPosts(res, req, userpostdto) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = "registerUser";
            const httpCode = 200;
            try {
                this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME} )- ${taskName} - QueryData: ${JSON.stringify(req.body)}`);
                const task = {
                    name: taskName,
                    info: "Add user details",
                    elapsedTimeInMs: Date.now()
                };
                const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'Post has been submitted successfully!', req.metadata, task);
                const newPost = yield this.userService.registerUsers(req.evUniqueID, userpostdto);
                return res.status(httpCode).json({
                    metadata: usermetadata,
                    post: newPost
                });
            }
            catch (error) {
                this.Logger.error(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
                this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);
                throw error;
            }
        });
    }
    getUserLists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = "getUserLists";
            const httpCode = 200;
            try {
                this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME} )- ${taskName} - QueryData: ${JSON.stringify(req.body)}`);
                const task = {
                    name: taskName,
                    info: "Get user list",
                    elapsedTimeInMs: Date.now()
                };
                const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'Fetch User List successfully', req.metadata, task);
                const userlist = yield this.userService.getUserData(req.evUniqueID);
                if (userlist == undefined) {
                    throw new Error(`Users are not found plz try again !!!`);
                }
                return res.status(httpCode).json({
                    metadata: usermetadata,
                    list: userlist
                });
            }
            catch (error) {
                this.Logger.error(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
                this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);
                throw error;
            }
        });
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ title: 'Create Users' }),
    swagger_1.ApiExcludeEndpoint(),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_post_dto_1.UserPostDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addPost", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiExcludeEndpoint(),
    swagger_1.ApiOperation({ title: 'Fetch user details' }),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserList", null);
__decorate([
    common_1.Get(':userID'),
    swagger_1.ApiImplicitParam({ name: 'userID' }),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiExcludeEndpoint(),
    swagger_1.ApiOperation({ title: 'Fetch user details according to username' }),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param('userID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    common_1.Delete(':userID'),
    swagger_1.ApiImplicitParam({ name: 'userID' }),
    swagger_1.ApiOperation({ title: 'Delete user using username' }),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiExcludeEndpoint(),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param('userID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    common_1.Put(),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiExcludeEndpoint(),
    swagger_1.ApiOperation({ title: 'Update user details by username' }),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_post_dto_1.UserPostDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    common_1.Post('/noorm'),
    swagger_1.ApiOperation({ title: 'Create users' }),
    swagger_1.ApiExcludeEndpoint(),
    __param(0, common_1.Res()), __param(1, common_1.Req()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_post_dto_1.UserPostDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addPosts", null);
__decorate([
    common_1.Get('/noorm/getlist'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiExcludeEndpoint(),
    swagger_1.ApiOperation({ title: 'Fetch user details' }),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserLists", null);
UsersController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, logger_service_1.LogService, app_service_1.AppService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map