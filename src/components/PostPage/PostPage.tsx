import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Typography, Button, Spin, Tooltip } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import PostsStore from '../../store/PostsStore';
import './postPage.scss';

const { Title, Paragraph } = Typography;

type TParams = { id: string };

const PostPage: FC<RouteComponentProps<TParams>> = ({ match: { params: { id } } }) => {
  const { currentPost, error } = PostsStore;
  const history = useHistory();

  useEffect(() => {
    PostsStore.getPost(+id);
  }, [id]);

  let content;

  if (error) {
    content = (
      <div>
        <Tooltip title="Error">
          <WarningOutlined className="warningIcon" />
        </Tooltip>
      </div>
    );
  }

  if (!currentPost && !error) {
    content = <div><Spin size="large"/></div>
  }

  if (currentPost) {
    content = (
      <>
        <Title>{currentPost.title}</Title>
        <Paragraph>{currentPost.body}</Paragraph>
      </>
    );
  }

  return (
    <div className="post">
      <div className="post_text">
        {content}
      </div>
      <Button type="primary" onClick={() => history.push('/')}>Назад</Button>
    </div>
  )
};

export default observer(PostPage);
