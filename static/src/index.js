/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-11T19:48:51+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T11:17:01+08:00
* @License: The MIT License (MIT)
*/


import 'antd/lib/index.css';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Backbone from 'backbone';
import Router from './router';

import { authModelInstance } from './models/Auth';
import CheckLogin from './views/CheckLogin';
import Login from './views/Login';

function initApplication(data) {
  new Router({ isAdmin: (data && data.value && data.value.is_admin)
    || authModelInstance.get('is_admin') });
  Backbone.history.start();
}

function show(component, node) {
  ReactDOM.render(React.createElement(component), node);
}

show(CheckLogin, document.getElementById('app'));

authModelInstance.self().done(initApplication).fail(() => {
  authModelInstance.on('login-success', initApplication);
  show(Login, document.getElementById('app'));
});
