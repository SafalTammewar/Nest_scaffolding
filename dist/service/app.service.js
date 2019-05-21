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
const moment = require("moment");
const crypt = require("crypto");
const jwt = require("jsonwebtoken");
const errorcodes_service_1 = require("../errorcodes/errorcodes.service");
const logger_service_1 = require("./logger.service");
let AppService = class AppService {
    constructor(logger, errorService) {
        this.logger = logger;
        this.errorService = errorService;
        this.MODULENAME = "AppService";
    }
    endMetaData(evUniqueID, errCode, errMsg, metadata, task) {
        const taskName = "endMetaData method";
        try {
            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}- QueryData:${JSON.stringify(metadata)}`);
            const errorData = this.errorService.getErrorInformation(evUniqueID, errCode, errMsg);
            metadata.errCode = errorData.code;
            metadata.errMsg = errorData.message;
            metadata.elapsedTimeInMS = moment(Date.now()).diff(metadata.requestTS, 'milliseconds');
            metadata.tasks[metadata.tasks.push({
                name: task.name,
                info: task.info,
                startTS: moment().format(),
                elapsedTimeInMS: moment(Date.now()).diff(task.elapsedTimeInMs, 'milliseconds')
            }) - 1];
            return metadata;
        }
        catch (error) {
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-${taskName}-${error.message}`);
            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}-${error.stack}`);
            throw error;
        }
    }
    generateJWT(evUniqueID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'generateJWT';
            try {
                this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(data)}`);
                let jwtHeader = {
                    "alg": "HS256",
                    "typ": "JWT"
                };
                return jwt.sign(data, process.env.JWTSECRET, { algorithm: 'HS256', header: jwtHeader });
            }
            catch (error) {
                this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
                this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);
                throw error;
            }
        });
    }
    generateJWTManual(evUniqueID, payload) {
        const taskName = 'generateJWTManual';
        try {
            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${JSON.stringify(payload)}`);
            let header = {
                "alg": "HS256",
                "typ": "JWT"
            };
            const hdrEncoded = this.cleanUpJWTManual(evUniqueID, Buffer.from(JSON.stringify(header)).toString('base64'));
            const payEncoded = this.cleanUpJWTManual(evUniqueID, Buffer.from(JSON.stringify(payload)).toString('base64'));
            const combined = hdrEncoded + '.' + payEncoded;
            const origSig = crypt.createHmac('sha256', process.env.JWTSECRET).update(combined).digest('base64');
            const jwtSig = this.cleanUpJWTManual(evUniqueID, origSig);
            return `${combined}.${jwtSig}`;
        }
        catch (error) {
            this.logger.error(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${error.message}`);
            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${error.stack}`);
            throw error;
        }
    }
    cleanUpJWTManual(evUniqueID, val) {
        const taskName = 'cleanUpJWT';
        try {
            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${val}`);
            val = val.replace(/\+/gi, '-');
            val = val.replace(/\//gi, '_');
            val = val.split('=')[0];
            return val;
        }
        catch (e) {
            this.logger.error(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${e.message}`);
            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${e.stack}`);
            throw e;
        }
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [logger_service_1.LogService, errorcodes_service_1.ErrorcodesService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map