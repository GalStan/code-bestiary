import express from "express";
import bodyParser from "body-parser";
import { ArticleStorage } from "./storage/Storage";

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app
  .route("/article/:id?")
  .get(async (req, res) => {
    const { id } = req.params;

    const response = await new ArticleStorage().read(id);

    res.send(response);
  })
  .post(async (req, res) => {
    const { article } = req.body;

    const response = await new ArticleStorage().create(article);

    res.send(response);
  })
  .put(async (req, res) => {
    const { article } = req.body;

    const response = await new ArticleStorage().update(article);

    res.send(response);
  })
  .delete(async (req, res) => {
    const { id } = req.body;

    const response = await new ArticleStorage().delete(id);

    res.send(response);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
