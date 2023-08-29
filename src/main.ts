import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IUserService } from './users/users.service.interface';
import { UserService } from './users/users.service';
import { IUserController } from './users/users.controller.interface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}
// const logger = new LoggerService();
// const app = new App(
//   logger,
//   new UserController(logger),
//   new ExeptionFilter(logger)
// );
// await app.init();
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

// const appContainer = new Container();
// appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
// appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
// appContainer.bind<UserController>(TYPES.UserController).to(UserController);
// appContainer.bind<App>(TYPES.Application).to(App);
// const app = appContainer.get<App>(TYPES.Application);
//  app.init();

export const { app, appContainer } = bootstrap();
