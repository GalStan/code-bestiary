export enum CRUDStatus {
  FAIL = "0",
  SUCCESS = "1"
}

export const TYPES = {
  Controller: Symbol("Controller"),
  ArticleService: Symbol("ArticleService"),
  ArticleStorage: Symbol("ArticleStorage")
};
