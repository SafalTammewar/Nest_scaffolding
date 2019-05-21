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
const app_service_1 = require("./app.service");
const logger_service_1 = require("../service/logger.service");
let ErrorFilter = class ErrorFilter {
    constructor(logger, appService) {
        this.logger = logger;
        this.appService = appService;
        this.MODULENAME = "ErrorFilter";
    }
    catch(error, host) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskName = 'Error-Service';
            try {
                this.response = host.switchToHttp().getResponse();
                this.request = host.switchToHttp().getRequest();
                if (this.request.url == "/favicon.ico") {
                    return;
                }
                this.logger.debug(`[${this.request.evUniqueID}] ${this.MODULENAME} (${taskName}) `);
                let status = (error instanceof common_1.HttpException) ? error.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                this.request.metadata.errMsg = error.message;
                this.request.metadata.errCode = 1;
                this.request.timestamp = new Date().toISOString();
                this.logger.error(`[${this.request.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);
                this.logger.debug(`[${this.request.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.stack}`);
                const task = {
                    name: taskName,
                    info: error.stack,
                    elapsedTimeInMs: Date.now()
                };
                let responseobj = yield this.appService.endMetaData(this.request.evUniqueID, this.request.metadata.errCode, error.message, this.request.metadata, task);
                return this.response.status(status).json(responseobj);
            }
            catch (error) {
                this.logger.error(`[${this.request.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);
                this.logger.debug(`[${this.request.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.stack}`);
                throw error;
            }
        });
    }
};
ErrorFilter = __decorate([
    common_1.Catch(),
    common_1.Injectable(),
    __metadata("design:paramtypes", [logger_service_1.LogService, app_service_1.AppService])
], ErrorFilter);
exports.ErrorFilter = ErrorFilter;
//# sourceMappingURL=errorhandler.service.js.map