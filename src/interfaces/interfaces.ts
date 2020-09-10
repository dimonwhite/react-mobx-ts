export interface IPost {
  title: string,
  body: string,
}

export interface IFullPost extends IPost {
  id: number,
  userId?: number,
}

export interface IPostsTable {
  posts: IFullPost[] | undefined,
  error: boolean,
}
