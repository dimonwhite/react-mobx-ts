import React, { FC, useEffect } from 'react';
import PostsStore from '../../store/PostsStore';
import { observer } from 'mobx-react';
import { Button, Divider } from 'antd';
import PostsTable from '../PostsTable/PostsTable';

const TablePage: FC = () => {
  const { posts, error } = PostsStore;

  useEffect(() => {
    PostsStore.getPosts();
  }, []);

  const createHandler = () => {
    PostsStore.setShowModal(true);
    PostsStore.clearPostForUpdate();
  };

  return (
    <>
      <Button type="primary" onClick={createHandler}>Create Post</Button>
      <Divider />
      <PostsTable posts={posts} error={error} />
    </>
  );
};

export default observer(TablePage);
