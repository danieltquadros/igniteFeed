import * as IHeaderLanguage from "./IHeaderLanguage";
import * as ISidebarLanguage from "./ISidebarLanguage";
import * as IPostLanguage from "./IPostLanguage";
import * as ICommentLanguage from "./ICommentLanguage";

export interface model {
  languageName: string;
  header: IHeaderLanguage.model;
  sidebar: ISidebarLanguage.model;
  post: IPostLanguage.model;
  comment: ICommentLanguage.model;
}

export const defaultInstance = {
  languageName: "",
};
