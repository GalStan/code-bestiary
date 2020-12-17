import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { ArticleCRUD, CRUDStatus } from "./entyties";
import { Article, UUID } from "shared/entyties";
import { parseArticles, stringifyArticle } from "./utils";

const FILE_NAME = "articles.txt";

const fsPromises = fs.promises;

export class ArticleStorage implements ArticleCRUD {
  getArticles(): Promise<Article[]> {
    return fsPromises.readFile(FILE_NAME, { encoding: "utf-8" }).then(parseArticles);
  }

  setArticles(articles: Article[]): Promise<void> {
    const stringifiedArticles = articles.map(stringifyArticle).join("");

    return fsPromises.writeFile(FILE_NAME, stringifiedArticles);
  }

  create(article: Article): Promise<CRUDStatus> {
    article.id = uuidv4();
    const stringifiedArticle = stringifyArticle(article);

    return fsPromises
      .appendFile(FILE_NAME, stringifiedArticle)
      .then(() => CRUDStatus.SUCCESS)
      .catch(() => CRUDStatus.FAIL);
  }

  read(articleId: UUID): Promise<Article | CRUDStatus.FAIL> {
    return this.getArticles()
      .then(articles => {
        const article = articles.find(art => art.id === articleId);

        if (!article) {
          return CRUDStatus.FAIL;
        }

        return article;
      })
      .catch(() => CRUDStatus.FAIL);
  }

  async update(article: Article): Promise<Article | CRUDStatus.FAIL> {
    try {
      const articles = await this.getArticles();
      const articlesList = articles.filter(art => art.id !== article.id);
      articlesList.push(article);
      await this.setArticles(articlesList);

      return article;
    } catch (e) {
      return CRUDStatus.FAIL;
    }
  }

  async delete(articleId: UUID): Promise<CRUDStatus> {
    try {
      const articles = await this.getArticles();
      const articlesList = articles.filter(art => art.id !== articleId);
      await this.setArticles(articlesList);

      return CRUDStatus.SUCCESS;
    } catch (e) {
      return CRUDStatus.FAIL;
    }
  }
}
