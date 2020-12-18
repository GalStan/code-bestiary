import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";
import { ArticleController, RegistrableController } from "./controllers";
import { ArticleStorage, ArticleStorageImpl } from "./storage/Storage";
import { ArticleService, ArticleServiceImpl } from "./services";

const container = new Container();
container.bind<RegistrableController>(TYPES.Controller).to(ArticleController);
container.bind<ArticleService>(TYPES.ArticleService).to(ArticleServiceImpl);
container.bind<ArticleStorage>(TYPES.ArticleStorage).to(ArticleStorageImpl);

export default container;
