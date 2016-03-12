import Backbone from 'backbone';
import ajax from '../utils/ajax';

export default Backbone.Model.extend({

  defaults: {
    id: null,
    name: '',
    secret: '',
    doamin: '',
    callback: '',
    desc: '',
    is_admin: 0,
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
    const url = `/admin/oauths/${id?id+'/':''}`;

    return ajax({
      url: url,
      type: id ? 'PUT' : 'POST',
      data: this.toJSON(),
    });
  },

})
