import 'reflect-metadata';
import { Mapper } from '@nartc/automapper';
import { createExpressServer, useContainer } from 'routing-controllers';
import config from '../config';
import { AuthController } from './controllers/AuthController';
import { Container } from 'typedi';
import { ControllerMapperProfile } from './controllers/mapper/ControllerMapperProfile';
import { RepositoryMapperProfile } from './repositories/mapper/RepositoryMapperProfile';
import authorizationChecker from '@/api/auth/authorizationChecker';
import currentUserChecker from '@/api/auth/currentUserChecker';
import { UserController } from '@/api/controllers/UserController';
import SetupPassport from '@/lib/passport';
import {GitHubController} from "@/api/controllers/GitHubController";

export class API {
  static async init() {
    const passport = SetupPassport();
    useContainer(Container);
    const app = createExpressServer({
      cors: true,
      controllers: [AuthController, UserController, GitHubController],
      middlewares: [],
      routePrefix: '/api',

      validation: {
        whitelist: true,
        forbidNonWhitelisted: true,
      },
      authorizationChecker: authorizationChecker,
      currentUserChecker: currentUserChecker,
    });

    app.use(passport.initialize());

    API.initAutoMapper();

    app.listen(config.port, () => {
      console.log(`Server start http://localhost:${config.port}`);
    });
  }

  static initAutoMapper() {
    Mapper.withGlobalSettings({
      skipUnmappedAssertion: true,
      useUndefined: true,
    });
    Mapper.addProfile(RepositoryMapperProfile);
    Mapper.addProfile(ControllerMapperProfile);
  }
}
