interface IPost {
  title: string,
  body: string,
}

interface IFullPost extends IPost {
  id: number,
  userId: number,
}

type Headers = {
  headers: {
    "Content-type": string,
  }
}

export default class Service {
  private readonly _apiBase: string = 'https://stream.dimonwhite.ru/';
  private readonly headers: Headers = {
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };

  async getPosts(): Promise<IFullPost[]> {
    const response: Response = await fetch(`${this._apiBase}posts/`);

    if (!response.ok) {
      throw new Error(`Could not fetch posts, ${response.status}`);
    }

    return await response.json();
  }

  async getPost(id: number): Promise<IFullPost> {
    const response: Response = await fetch(`${this._apiBase}posts/${id}`);

    if (!response.ok) {
      throw new Error(`Could not fetch post, ${response.status}`);
    }

    return await response.json();
  }

  async createPost({ title, body }: IPost): Promise<IFullPost> {
    const response: Response = await fetch(`${this._apiBase}posts/`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
      ...this.headers,
    });

    if (!response.ok) {
      throw new Error(`Could not fetch posts, ${response.status}`);
    }

    return await response.json();
  }

  async updatePost({ id, title, body, userId }: IFullPost): Promise<IFullPost> {
    const response: Response = await fetch(`${this._apiBase}posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        body,
        userId,
      }),
      ...this.headers,
    });

    if (!response.ok) {
      throw new Error(`Could not fetch post, ${response.status}`);
    }

    return await response.json();
  }

  async deletePost(id: number): Promise<object> {
    const response: Response = await fetch(`${this._apiBase}posts/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Could not fetch post, ${response.status}`);
    }

    return await response.json();
  }
}
