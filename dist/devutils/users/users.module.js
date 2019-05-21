"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var UsersModule_1;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const user_entity_1 = require("./entity/user.entity");
const logger_service_1 = require("../../service/logger.service");
const app_service_1 = require("../../service/app.service");
const errorcodes_service_1 = require("../../errorcodes/errorcodes.service");
const general_errocodes_config_1 = require("../../errorcodes/general.errocodes.config");
let UsersModule = UsersModule_1 = class UsersModule {
};
UsersModule = UsersModule_1 = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.userEntity])],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, logger_service_1.LogService, app_service_1.AppService, errorcodes_service_1.ErrorcodesService, general_errocodes_config_1.GeneralCodes],
        exports: [users_service_1.UsersService, UsersModule_1]
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map