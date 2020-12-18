import express from "express";
import bodyParser from "body-parser";
import container from "./inversify.config";
import { TYPES } from "./types";
import { RegistrableController } from "./controllers";

const app = express();
const port = 3001;

app.use(bodyParser.json());

const controllers = container.getAll<RegistrableController>(TYPES.Controller);

controllers.forEach(controller => controller.register(app));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
