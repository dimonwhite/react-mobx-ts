import React, { FC, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TablePage from '../TablePage/TablePage';
import PostPage from '../PostPage/PostPage';
import { observer } from 'mobx-react';
import PostsStore from '../../store/PostsStore';
import ModalForm from '../ModalForm/ModalForm';
import { openNotificationError, openNotificationSuccess } from '../notifications/notifications';

const App: FC = () => {
  const { displayError, displaySuccess, showModal } = PostsStore;

  useEffect(() => {
    if (displayError) {
      openNotificationError();
    }
  }, [displayError]);

  useEffect(() => {
    if (displaySuccess) {
      openNotificationSuccess();
    }
  }, [displaySuccess]);

  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route component={TablePage} path="/" exact />
          <Route component={PostPage} path="/post/:id" />
        </Switch>
      </div>
      <ModalForm showModal={showModal} />
    </BrowserRouter>
  );
};

export default observer(App);
