import React, { FC, useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import PostsStore from '../../store/PostsStore';
import { LoadingOutlined } from '@ant-design/icons';
import { IFullPost } from '../../interfaces/interfaces';
import './modalForm.scss';

type TModalForm = {
  showModal: boolean,
  post: IFullPost | undefined,
};
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 19 },
};

const ModalForm: FC<TModalForm> = ({ showModal, post }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const closeModal = (): void => {
    PostsStore.setShowModal(false);
    form.resetFields();
  };

  const onFinish = (values: any) => {
    setLoading(true);
    if (post) {
      PostsStore.updatePost({ id: post.id, ...values })
        .then(() => {
          setLoading(false);
          form.resetFields();
        });
      return;
    }
    PostsStore.createPost(values)
      .then(() => {
        setLoading(false);
        form.resetFields();
      });
  };

  useEffect(() => {
    if (post) {
      form.setFieldsValue({ title: post.title });
      form.setFieldsValue({ body: post.body });
    }
  }, [post, form]);

  return (
    <Modal
      title="Create Post"
      visible={showModal}
      footer={null}
      onCancel={closeModal}
    >
      <Form
        {...layout}
        form={form}
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Body"
          name="body"
          rules={[{ required: true, message: 'Please input body!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          {loading ? <LoadingOutlined /> : ''}
        </Form.Item>
      </Form>
    </Modal>
  )
};

export default ModalForm;
