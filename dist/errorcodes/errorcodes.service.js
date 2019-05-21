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
const general_errocodes_config_1 = require("./general.errocodes.config");
const logger_service_1 = require("../service/logger.service");
let ErrorcodesService = class ErrorcodesService {
    constructor(logger, generalcodes) {
        this.logger = logger;
        this.generalcodes = generalcodes;
        this.MODULENAME = "ErrorcodesService";
    }
    getErrorInformation(evUniqueID, errCode, errMsg) {
        const taskName = "getErrorInformation";
        try {
            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName})`);
            let errorData = this.generalcodes.ErrorCodes;
            const eCode = parseInt(errCode);
            const filtered = errorData.filter((item) => {
                return (item.code === eCode);
            });
            if (filtered.length > 0) {
                const filteredItem = filtered[0];
                if (filteredItem.canOverrideMessage) {
                    errMsg = errMsg || filteredItem.message;
                    if (errMsg === '') {
                        errMsg = filteredItem.message;
                    }
                }
                else {
                    errMsg = filteredItem.message;
                }
                const errInfo = filteredItem;
                errInfo.message = errMsg;
                return errInfo;
            }
            else {
                throw new Error(`Unknown error code: ${errCode}`);
            }
        }
        catch (error) {
            this.logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${error.stack}`);
            this.logger.error(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${error.message}`);
            throw error;
        }
    }
};
ErrorcodesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [logger_service_1.LogService, general_errocodes_config_1.GeneralCodes])
], ErrorcodesService);
exports.ErrorcodesService = ErrorcodesService;
//# sourceMappingURL=errorcodes.service.js.map