"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const default_middleware_1 = require("./middleware/default.middleware");
const users_module_1 = require("./devutils/users/users.module");
const auth_middleware_1 = require("./middleware/auth.middleware");
const ping_controller_1 = require("./ping/ping.controller");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./service/app.service");
const errorcodes_module_1 = require("./errorcodes/errorcodes.module");
const users_controller_1 = require("./devutils/users/users.controller");
const apiutils_route_1 = require("./devutils/apiutils.route");
const errorhandler_service_1 = require("./service/errorhandler.service");
const errorcodes_service_1 = require("./errorcodes/errorcodes.service");
const logger_service_1 = require("./service/logger.service");
const user_entity_1 = require("./devutils/users/entity/user.entity");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(default_middleware_1.DefaultMiddleware)
            .forRoutes('*')
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude({ path: '/users', method: common_1.RequestMethod.POST }, { path: '/users/noorm', method: common_1.RequestMethod.POST })
            .forRoutes(users_controller_1.UsersController);
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [users_module_1.UsersModule, typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                port: 5432,
                username: 'postgres',
                password: 'root',
                database: 'nestdapp',
                host: 'localhost',
                synchronize: true,
                entities: [user_entity_1.userEntity]
            }), errorcodes_module_1.ErrorcodesModule],
        controllers: [ping_controller_1.PingController, app_controller_1.AppController, apiutils_route_1.ApiUtils],
        providers: [logger_service_1.LogService, app_service_1.AppService, errorcodes_service_1.ErrorcodesService, {
                provide: core_1.APP_FILTER,
                useClass: errorhandler_service_1.ErrorFilter,
            }],
        exports: [logger_service_1.LogService, app_service_1.AppService, errorcodes_service_1.ErrorcodesService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map