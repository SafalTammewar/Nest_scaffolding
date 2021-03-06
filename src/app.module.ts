/* 
* Nest & Third party imports
*/
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

/* 
* Custom imports
*/
import { DefaultMiddleware } from './middleware/default.middleware';
import { UsersModule } from './devutils/users/users.module';

import { AuthMiddleware } from './middleware/auth.middleware';
import { PingController } from './ping/ping.controller';
import { AppController } from './app.controller';
import { AppService } from './service/app.service';
import { ErrorcodesModule } from './errorcodes/errorcodes.module';
import { UsersController } from './devutils/users/users.controller';
import { ApiUtils } from './devutils/apiutils.route';
import { ErrorFilter } from './service/errorhandler.service';
import { ErrorcodesService } from './errorcodes/errorcodes.service';
import { LogService } from './service/logger.service';
import { userEntity } from './devutils/users/entity/user.entity';


/*
* Main module and Database connection configuration
*/
@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    username: 'cxxzmixwhpzblf',
    password: '2187f850a83f8c1b96f290392b6ca1ef89150574649dcd4ddb0a5f9a7bfe6340',
    database: 'd1up4irvq9pvtu',
    host: 'ec2-54-225-106-93.compute-1.amazonaws.com',
    synchronize: true,
    entities: [userEntity]
  }), ErrorcodesModule],
  controllers: [PingController, AppController, ApiUtils],
  providers: [LogService, AppService, ErrorcodesService, {
    provide: APP_FILTER,
    useClass: ErrorFilter,
  }],
  exports: [LogService, AppService, ErrorcodesService]
})

/* 
* Middleware Settings
*/
export class AppModule implements NestModule {

  /* For defult middleware apply for all routes */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DefaultMiddleware)
      .forRoutes('*')
      .apply(AuthMiddleware)
      .exclude(
        { path: '/users', method: RequestMethod.POST },
        { path: '/users/noorm', method: RequestMethod.POST }
      )
      .forRoutes(UsersController)
  }

}