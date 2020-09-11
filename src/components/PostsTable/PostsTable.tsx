import React, { FC } from 'react';
import { ConfigProvider, Spin, Table, Tooltip } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { IFullPost, IPostsTable } from '../../interfaces/interfaces';
import ControlPost from '../ControlPost/ControlPost';

import './postsTable.scss';

const columns: ColumnsType<IFullPost> = [
  {
    title: 'Title',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'Control',
    key: 'control',
    align: 'center',
    render: (text, record) => <ControlPost id={record.id} />,
  }
];

const PostsTable: FC<IPostsTable> = ({ posts, error }) => {

  const customizeRenderEmpty = (): JSX.Element => {
    if (error) {
      return (
        <Tooltip title="Error">
          <WarningOutlined className="warningIcon" />
        </Tooltip>
      )
    }

    return <Spin size="large" />;
  };

  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      <Table dataSource={posts} columns={columns} rowKey={'id'} bordered />
    </ConfigProvider>
  )

};
export default PostsTable;
