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
            url: `/api/users/self/`
        }).done((data) => {
            this.set(data.value)
            this.trigger('sync')
        }).fail((msg) => {
            this.trigger('error', msg)
        })
    },

    save() {
        const id = this.get('id')
        const url = `/api/users/self`

        return ajax({
            url: url,
            type: id ? 'PUT' : 'POST',
            data: this.toJSON()
        })
    },
})
