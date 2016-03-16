/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-14T10:30:11+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-16T13:09:19+08:00
* @License: The MIT License (MIT)
*/


import Backbone from 'backbone';
import ajax from '../utils/ajax';

export default Backbone.Model.extend({

  defaults: {
    id: null,
    username: '',
    realname: '',
    aliasname: '',
    mobile: '',
    email: '',
    key: '',
    is_delete: false,
    gender: false,
    is_admin: false,
  },

  fetch() {
    return ajax({
      url: `/admin/users/${this.get('id')}/`,
    }).done((data) => {
      this.set(data.value);
      this.trigger('sync');
    }).fail((msg) => {
      this.trigger('error', msg);
    });
  },

  save() {
    const id = this.get('id');
    const url = `/admin/users/${ id ? id + '/' : ''}`;

    return ajax({
      url: url,
      type: id ? 'PUT' : 'POST',
      data: this.toJSON(),
    });
  },
});
