import React from 'react';
import ReactDOM from 'react-dom';
import Button from "antd/lib/button";
import './index.scss';
import 'antd/dist/antd.css';

const App = () => <Button type="primary">Primary Button</Button>;

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
