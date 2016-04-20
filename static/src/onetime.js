/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T22:17:03+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-21T00:24:35+08:00
* @License: The MIT License (MIT)
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import Onetime from './containers/Onetime';
import 'antd/lib/index.css';
import './index.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Onetime />
  </Provider>,
  document.getElementById('onetime')
);
