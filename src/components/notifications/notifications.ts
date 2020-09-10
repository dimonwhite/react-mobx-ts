import { notification } from 'antd';

export const openNotificationError = (): void => {
  notification.error({
    message: 'Error',
    description:
      'Connection interrupted',
  });
};

export const openNotificationSuccess = (): void => {
  notification.success({
    message: 'Success',
    description:
      'Created',
  });
};
