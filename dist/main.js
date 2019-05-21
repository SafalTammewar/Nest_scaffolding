"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const bodyParser = require("body-parser");
const swagger_1 = require("@nestjs/swagger");
require('dotenv').config({ "path": './secured/.env' });
const app_module_1 = require("./app.module");
const logger_service_1 = require("./service/logger.service");
const port = process.env.PORT || 9001;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        let Logger = new logger_service_1.LogService();
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.use(bodyParser.json());
        app.enableCors();
        app.setGlobalPrefix(process.env.VERSION);
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');
        const options = new swagger_1.DocumentBuilder()
            .setTitle('Nest Js ')
            .setDescription('The Nest Js api description')
            .setVersion(process.env.SwaggerVersion)
            .addBearerAuth('Authorization', 'header', 'apiKey')
            .setBasePath(process.env.VERSION)
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('docs', app, document);
        yield app.listen(port);
        Logger.debug(`APIVERSION = ${process.env.VERSION}`);
        Logger.debug(`PORT = ${port}`);
        Logger.debug(`NODE_ENV = ${process.env.NODE_ENV}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map