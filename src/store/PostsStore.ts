import Client from '../services/Client';
import { IFullPost, IPost } from '../interfaces/interfaces';
import { action, decorate, observable } from 'mobx';

class PostsStore {
  posts: IFullPost[] = [];
  error: boolean = false;
  currentPost: IFullPost | undefined;
  displayError: boolean = false;
  displaySuccess: boolean = false;
  showModal: boolean = false;
  postForUpdate: IFullPost | undefined;

  getPosts(): void {
    this.setError(false);
    Client.getPosts()
      .then((posts) => {
        this.posts = posts;
      })
      .catch(() => {
        this.setError(true);
      });
  }

  getPost(id: number): void {
    this.currentPost = undefined;
    this.setError(false);
    Client.getPost(id)
      .then((post) => {
        this.currentPost = post;
      })
      .catch(() => {
        this.setError(true);
      })
  }

  deletePost(id: number): Promise<void> {
    this.setDisplayError(false);
    return Client.deletePost(id)
      .then(() => {
        this.posts = this.posts!.filter((item) => item.id !== id);
      })
      .catch(() => {
        this.setDisplayError(true);
      });
  }

  createPost(post: IPost): Promise<void> {
    this.setError(false);
    this.displaySuccess = false;
    return Client.createPost(post)
      .then((post) => {
        this.posts = [...this.posts, post];
        this.setShowModal(false);
        this.displaySuccess = true;
      })
      .catch(() => {
        this.setDisplayError(true);
      });
  }

  updatePost(post: IFullPost): Promise<void> {
    this.setError(false);
    this.displaySuccess = false;
    return Client.updatePost(post)
      .then((newPost) => {
        this.posts = this.posts.map((post) =>
          newPost.id === post.id ? newPost : post
        );
        this.setShowModal(false);
        this.displaySuccess = true;
      })
      .catch(() => {
        this.setDisplayError(true);
      });
  }

  clearPostForUpdate() {
    this.postForUpdate = undefined;
  }

  setPostForUpdate(id: number) {
    [this.postForUpdate] = this.posts.filter((post) => post.id === id);
  }

  private setError(status: boolean): void {
    this.error = status;
    this.displayError = status;
  }

  setDisplayError(status: boolean): void {
    this.displayError = status;
  }

  setShowModal(status: boolean): void {
    this.showModal = status;
  }
}

decorate(PostsStore, {
  posts: observable,
  error: observable,
  currentPost: observable,
  displayError: observable,
  displaySuccess: observable,
  showModal: observable,
  postForUpdate: observable,
  getPosts: action,
  getPost: action,
  setDisplayError: action,
  setShowModal: action,
});

export default new PostsStore();
