import {IUser} from "./user";

export interface IComment {
  id?: number;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  movieId?: string;
  user?: IUser;
}

export default class Comment implements IComment {
  id?: number;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  movieId?: string;
  user?: IUser;

  constructor(comment: IComment) {
    this.id = comment.id;
    this.content = comment.content;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.movieId = comment.movieId;
    this.user = comment.user;
  }
}