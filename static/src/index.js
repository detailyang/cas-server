import 'antd/lib/index.css';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Backbone from 'backbone';
import Router from './router';

import { authModelInstance } from './models/Auth';
import CheckLogin from './views/CheckLogin.jsx';
import Login from './views/Login.jsx';

function initApplication(data) {
  new Router({ isAdmin: data.value.is_admin });
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
