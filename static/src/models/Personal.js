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
        key: '',
        notp: '',
        upload_url: '/api/users/self/avatar'
    },

    fetch() {
        return ajax({
            url: '/api/users/self/'
        }).done((data) => {
            this.set(data.value)
            this.trigger('sync')
        }).fail((msg) => {
            this.trigger('error', msg)
        })
    },

    save() {
        let id = this.get('id')
        let url = '/api/users/self'

        return ajax({
            url: url,
            type: id ? 'PUT' : 'POST',
            data: this.toJSON()
        })
    },

    resetPassword(oldpassword, newpassword) {
        let url = '/api/users/self/staticpassword'

        return ajax({
            url: url,
            type: 'PUT',
            data: {
                oldpassword: oldpassword,
                newpassword: newpassword
            }
        })
    },

    checkDynamicPassword(password) {
        let url = '/api/users/self/dynamicpassword'

        return ajax({
            url: url,
            type: 'POST',
            data: {
                dynamicpassword: password
            }
        })
    },

    upload(a,b,c,d) {
        console.log(a,b,c,d);
    }
})
