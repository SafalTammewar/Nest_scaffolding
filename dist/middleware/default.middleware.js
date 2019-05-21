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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const crypto = require("crypto");
const os = require("os");
const moment = require("moment");
const logger_service_1 = require("../service/logger.service");
let DefaultMiddleware = class DefaultMiddleware {
    constructor(logger) {
        this.logger = logger;
        this.MODULENAME = "DefaultMiddleware";
        this.apiResp = {};
    }
    hashAPIServer(evUniqueID) {
        let taskName = "hashAPIServer";
        try {
            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME} (${taskName})`);
            let hash = crypto.createHash('sha256');
            hash.update(os.hostname());
            return hash.digest('base64');
        }
        catch (error) {
            this.logger.error(`[${evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);
            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.stack}`);
            throw error;
        }
    }
    ;
    resolve() {
        let taskName = "In resolve method";
        return (req, res, next) => {
            try {
                const callGUID = uuid_1.v4();
                this.logger.debug(`[${callGUID}] ${this.MODULENAME} (${taskName})`);
                req.evUniqueID = callGUID;
                res.locals.evUniqueID = callGUID;
                this.apiResp.evUniqueID = callGUID;
                this.apiResp.requestURL = req.originalUrl;
                this.apiResp.apiServer = this.hashAPIServer(req.evUniqueID);
                this.apiResp.apiBuildVersion = process.env.npm_package_version || '--NOT AVAILABLE--';
                this.apiResp.requestTS = moment().format();
                this.apiResp.elapsedTimeInMS = Date.now();
                this.apiResp.tasks = [];
                req.metadata = this.apiResp;
                next();
            }
            catch (error) {
                this.logger.error(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);
                this.logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.stack}`);
                throw error;
            }
        };
    }
};
DefaultMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [logger_service_1.LogService])
], DefaultMiddleware);
exports.DefaultMiddleware = DefaultMiddleware;
//# sourceMappingURL=default.middleware.js.map