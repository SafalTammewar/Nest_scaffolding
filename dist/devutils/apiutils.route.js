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
const logger_service_1 = require("../service/logger.service");
const app_service_1 = require("../service/app.service");
const users_service_1 = require("./users/users.service");
let ApiUtils = class ApiUtils {
    constructor(logger, appService, userService) {
        this.logger = logger;
        this.appService = appService;
        this.userService = userService;
        this.MODULENAME = "ApiUtils";
    }
    authToken(req, res) {
        let taskname = "Auth token get method";
        try {
            this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-(${taskname})`);
            const curDate = new Date();
            const expDate = new Date();
            expDate.setSeconds(curDate.getSeconds() + 300);
            const data = {
                "evUniqueID": req.evUniqueID,
                "username": 'Safal@1234',
                "exp": expDate.getTime(),
                "iat": curDate.getTime(),
                "useJWT": '',
                "jwt": '',
                "errMsg": ''
            };
            res.render('auth-token', { data: data });
        }
        catch (error) {
            this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-(${taskname})- ${error.stack}`);
            this.logger.error(`[${req.evUniqueID}](${this.MODULENAME})-(${taskname})- ${error.message}`);
            throw error;
        }
    }
    encodeJWT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = "Auth token encode";
            try {
                this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(req.body)}`);
                const data = {
                    "evUniqueID": req.evUniqueID,
                    "username": req.body.username,
                    "exp": req.body.exp,
                    "iat": req.body.iat,
                    "useJWT": req.body.useJWT ? 'CHECKED' : '',
                    "jwt": req.body.jwt,
                    "errMsg": ''
                };
                let jwtPayload = {
                    "userID": req.body.username,
                    "exp": 0,
                    "iat": 0,
                };
                let exp = new Date(data.exp);
                let iat = new Date(data.iat);
                data.exp = exp.getTime();
                data.iat = iat.getTime();
                jwtPayload.exp = Math.floor(exp.getTime() / 1000);
                jwtPayload.iat = Math.floor(iat.getTime() / 1000);
                if (data.useJWT === 'CHECKED') {
                    data.jwt = yield this.appService.generateJWT(req.evUniqueID, jwtPayload);
                }
                else {
                    data.jwt = yield this.appService.generateJWTManual(req.evUniqueID, jwtPayload);
                }
                res.render('auth-token', { data: data });
            }
            catch (error) {
                this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
                this.logger.error(`[${req.evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);
                throw error;
            }
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiExcludeEndpoint(),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ApiUtils.prototype, "authToken", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiExcludeEndpoint(),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApiUtils.prototype, "encodeJWT", null);
ApiUtils = __decorate([
    common_1.Controller('/apiutils/auth-token'),
    __metadata("design:paramtypes", [logger_service_1.LogService, app_service_1.AppService, users_service_1.UsersService])
], ApiUtils);
exports.ApiUtils = ApiUtils;
//# sourceMappingURL=apiutils.route.js.map