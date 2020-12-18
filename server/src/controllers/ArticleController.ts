import express from "express";
import "reflect-metadata";
import { injectable, inject } from "inversify";
import { ArticleService } from "../services";
import { TYPES } from "../types";
import { RegistrableController } from "./types";

@injectable()
export default class ArtcileController implements RegistrableController {
  private articleService: ArticleService;

  constructor(@inject(TYPES.ArticleService) articleService: ArticleService) {
    this.articleService = articleService;
  }

  public register(app: express.Application): void {
    app
      .route("/article/:id?")
      .get(async (req, res) => {
        const { id } = req.params;

        const response = await this.articleService.getArticle(id);

        res.send(response);
      })
      .post(async (req, res) => {
        const { article } = req.body;

        const response = await this.articleService.creteArticle(article);

        res.send(response);
      })
      .put(async (req, res) => {
        const { article } = req.body;

        const response = await this.articleService.updateArticle(article);

        res.send(response);
      })
      .delete(async (req, res) => {
        const { id } = req.body;

        const response = await this.articleService.deleteArticle(id);

        res.send(response);
      });
  }
}
