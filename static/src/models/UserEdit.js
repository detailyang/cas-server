import Backbone from 'backbone'
import ajax from '../utils/ajax'


export default Backbone.Model.extend({

    defaults: {
        id: null,
        username: '',
        chinesename: '',
        aliasname: '',
        mobile: '',
        email: '',
        is_delete: false,
        gender: '0',
        key: ''
    },

    fetch() {
        return ajax({
            url: `/admin/users/${this.get('id')}/`
        }).done((data) => {
            this.set(data.value)
            this.trigger('sync')
        }).fail((msg) => {
            this.trigger('error', msg)
        })
    },

    save() {
        let id = this.get('id')
        let url = `/admin/users/${ id ? id + '/' : ''}`

        return ajax({
            url: url,
            type: id ? 'PUT' : 'POST',
            data: this.toJSON()
        })
    },
})
