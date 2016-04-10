/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-11T19:48:51+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-04T23:20:51+08:00
* @License: The MIT License (MIT)
*/


import Backbone from 'backbone';
import ajax from '../utils/ajax';

const AuthModel = Backbone.Model.extend({
  defaults: {
    // 是否已经登录
    isLogin: false,
    username: '',
    password: '',
    isAdmin: false,
    type: 0,
  },

  self() {
    return ajax({
      url: '/api/users/self',
    }).done((data) => {
      this.set({
        isLogin: true,
        username: data.username,
        isAdmin: data.is_admin,
      });
    }).fail(() => {
      this.set({
        isLogin: false,
        username: '',
      });
    });
  },

  login(username, password) {
    return ajax({
      url: '/public/users/login',
      type: 'POST',
      data: {
        username,
        password,
      },
    }).done((data) => {
      this.set({
        isLogin: true,
        username: username,
        password: '',
      });
      this.trigger('login-success', data);
    }).fail(() => {
      this.set({
        isLogin: false,
        username: '',
      });
      this.trigger('login-error');
    });
  },

  logout() {
    return ajax({
      url: '/public/users/logout',
      type: 'POST',
    });
  },

});

const authModelInstance = new AuthModel();

export default AuthModel;
export {
  authModelInstance,
};
