/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-11T19:48:51+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T22:17:08+08:00
* @License: The MIT License (MIT)
*/


import Backbone from 'backbone';
import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import Nav from './components/Nav';

import User from './views/User';
import OAuth from './views/OAuth';
import Personal from './views/Personal';

export default Backbone.Router.extend({

  routes: {
    '!/user': 'user',
    '!/oauth': 'oauth',
    '!/personal': 'personal',
    '*index': 'index',
  },

  initialize(attr) {
    this.header = document.getElementById('header');
    this.nav = document.getElementById('nav');
    this.app = document.getElementById('app');
    this.isAdmin = attr.isAdmin;

    this.show(Header, null, this.header);
    this.show(Nav, {
      current: 'personal',
      isAdmin: this.isAdmin,
    }, this.nav);
  },

  user() {
    this.show(User);
    this.show(Nav, {
      current: 'user',
      isAdmin: this.isAdmin,
    }, this.nav);
  },

  oauth() {
    this.show(OAuth);
    this.show(Nav, {
      current: 'oauth',
      isAdmin: this.isAdmin,
    }, this.nav);
  },

  personal() {
    this.show(Personal);
    this.show(Nav, {
      current: 'personal',
      isAdmin: this.isAdmin,
    }, this.nav);
  },

  index() {
    this.navigate('!/user', {
      trigger: true,
      replace: true,
    });
  },

  show(components, props, node) {
    ReactDOM.render(React.createElement(components, props), node || this.app);
  },
});
