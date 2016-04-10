/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-11T19:48:51+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-01T16:50:51+08:00
* @License: The MIT License (MIT)
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './containers';
import configureStore from './store/configureStore';
import { hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import 'antd/lib/index.css';
import './index.scss';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Root history={history} />
  </Provider>,
  document.getElementById('app')
)