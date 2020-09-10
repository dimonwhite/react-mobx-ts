import React, { FC } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import PostsStore from '../../store/PostsStore';

type TModalForm = {
  showModal: boolean,
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 19 },
};

const ModalForm: FC<TModalForm> = ({ showModal }) => {

  const closeModal = (): void => {
    PostsStore.setShowModal(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    PostsStore.createPost(values)
  };

  return (
    <Modal
      title="Create Post"
      visible={showModal}
      footer={null}
      onCancel={closeModal}
    >
      <Form
        {...layout}
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
        </Form.Item>
      </Form>
    </Modal>
  )
};

export default ModalForm;
