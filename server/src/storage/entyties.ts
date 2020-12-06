import { Article } from "../../../shared/entyties";

export enum CRUDStatus {
  FAIL = 0,
  SUCCESS = 1
}

export interface ArticleCRUD {
  create: (article: Article) => Promise<CRUDStatus>;
  read: (articleId: number) => Promise<Article | CRUDStatus.FAIL>;
  update: (article: Article) => Promise<Article | CRUDStatus.FAIL>;
  delete: (articleId: number) => Promise<CRUDStatus>;
}
