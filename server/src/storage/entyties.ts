import { Article, UUID } from "../../../shared/entyties";

export enum CRUDStatus {
  FAIL = "0",
  SUCCESS = "1"
}

export interface ArticleCRUD {
  create: (article: Article) => Promise<CRUDStatus>;
  read: (articleId: UUID) => Promise<Article | CRUDStatus.FAIL>;
  update: (article: Article) => Promise<Article | CRUDStatus.FAIL>;
  delete: (articleId: UUID) => Promise<CRUDStatus>;
}
