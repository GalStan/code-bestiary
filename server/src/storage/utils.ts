import { Article } from "shared/entyties";

const DELIMITER = "%END%";

export const parseArticles = (data: string): Article[] =>
  data
    .split(DELIMITER)
    .filter(data => Boolean(data.trim()))
    .map(str => JSON.parse(str));

export const stringifyArticle = (article: Article): string => JSON.stringify(article) + DELIMITER;
