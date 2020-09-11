import React, { FC, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import PostsStore from '../../store/PostsStore';
import './controlPost.scss';

const ControlPost: FC<{ id: number }> = ({ id }) => {
  const [loading, setLoading] = useState(false);

  const deleteHandler = () => {
    setLoading(true);
    PostsStore.deletePost(id)
      .then(() => {
        setLoading(false);
      });
  };

  const changePost = () => {
    PostsStore.setShowModal(true);
    PostsStore.setPostForUpdate(id);
  };

  return (
    <div className="table_btn">
      <NavLink to={`/post/${id}`}>
        <Button type={'primary'}>Open</Button>
      </NavLink>
      <Tooltip title="Edit">
        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={changePost} />
      </Tooltip>
      <Tooltip title="Delete">
        <Button type="primary" danger shape="circle" icon={loading ? <LoadingOutlined /> : <DeleteOutlined />} onClick={deleteHandler} />
      </Tooltip>
    </div>
  );
};

export default ControlPost;
