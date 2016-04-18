/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T22:17:03+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-01T10:53:49+08:00
* @License: The MIT License (MIT)
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import { Login } from './containers';
import 'antd/lib/index.css';
import './index.scss';


const onOk = () => {
  location.href = location.href.replace('/public/oauth', '/public/oauth/authorize');
};

ReactDOM.render(
  <Provider store={store}>
    <Login onOk={onOk} />
  </Provider>,
  document.getElementById('oauth')
)