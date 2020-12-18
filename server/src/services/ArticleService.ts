import { inject, injectable } from "inversify";
import "reflect-metadata";
import { Article, UUID } from "shared/entyties";
import { ArticleStorage } from "../storage/Storage";
import { CRUDStatus, TYPES } from "../types";

export interface ArticleService {
  getArticle: (articleId: UUID) => Promise<Article | CRUDStatus.FAIL>;
  creteArticle: (article: Article) => Promise<CRUDStatus>;
  updateArticle: (article: Article) => Promise<Article | CRUDStatus.FAIL>;
  deleteArticle: (articleId: UUID) => Promise<CRUDStatus>;
}

@injectable()
export class ArticleServiceImpl implements ArticleService {
  private articleStorage;
  constructor(@inject(TYPES.ArticleStorage) articleStorage: ArticleStorage) {
    this.articleStorage = articleStorage;
  }

  public async getArticle(articleId: UUID): Promise<Article | CRUDStatus.FAIL> {
    return this.articleStorage.read(articleId);
  }
  public async creteArticle(article: Article): Promise<CRUDStatus> {
    return this.articleStorage.create(article);
  }
  public async updateArticle(article: Article): Promise<Article | CRUDStatus.FAIL> {
    return this.articleStorage.update(article);
  }
  public async deleteArticle(articleId: UUID): Promise<CRUDStatus> {
    return this.articleStorage.delete(articleId);
  }
}
