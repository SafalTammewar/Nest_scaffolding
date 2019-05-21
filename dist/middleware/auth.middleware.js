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
const jwt = require("jsonwebtoken");
const logger_service_1 = require("../service/logger.service");
let AuthMiddleware = class AuthMiddleware {
    constructor(logger) {
        this.logger = logger;
        this.MODULENAME = 'AuthMiddleware';
    }
    resolve(...args) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let taskName = "JWTAuthentication";
            try {
                this.logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName})- In resolve method`);
                const token = req.headers.authorization;
                if (token) {
                    try {
                        let check = yield jwt.verify(token, process.env.JWTSECRET);
                        req.check = check;
                        next();
                    }
                    catch (error) {
                        this.logger.error(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${JSON.stringify(error.message)}`);
                        this.logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${JSON.stringify(error.message)}`);
                        next(error);
                    }
                }
                else {
                    this.logger.error(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): Auth token missing`);
                    this.logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}):Auth token missing`);
                    next({ message: "Auth token missing", name: "JWT Token error", stack: "Please Send the auth token to every request" });
                }
            }
            catch (error) {
                this.logger.error(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);
                this.logger.debug(`[${req.evUniqueID}] ${this.MODULENAME} (${taskName}): ${error.message}`);
                next(error);
            }
        });
    }
};
AuthMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [logger_service_1.LogService])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
;
//# sourceMappingURL=auth.middleware.js.map