/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-11T12:16:28+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-04T23:28:00+08:00
* @License: The MIT License (MIT)
*/


import Backbone from 'backbone';
import ajax from '../utils/ajax';

export default Backbone.Model.extend({

  defaults: {
    id: null,
    name: '',
    secret: '',
    identify: '',
    doamin: '',
    callback: '',
    desc: '',
    is_admin: 0,
    is_received: 0,
    type: 0,
  },

  fetch() {
    return ajax({
      url: `/admin/oauths/${this.get('id')}/`,
    }).done((data) => {
      this.set(data.value);
      this.trigger('sync');
    }).fail((msg) => {
      this.trigger('error', msg);
    });
  },

  save() {
    const id = this.get('id');
    const url = `/admin/oauths/${id ? id + '/' : ''}`;

    return ajax({
      url: url,
      type: id ? 'PUT' : 'POST',
      data: this.toJSON(),
    });
  },

})
