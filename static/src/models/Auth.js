import Backbone from 'backbone'
import ajax from '../utils/ajax'

let AuthModel = Backbone.Model.extend({

    defaults: {
        // 是否已经登录
        isLogin: false,
        username: '',
        password: ''
    },

    self() {
        return ajax({
            url: '/api/users/self'
        }).done((data) => {
            this.set({
                isLogin: true,
                username: data.username
            })
        }).fail((data) => {
            this.set({
                isLogin: false,
                username: ''
            })
        })
    },

    login(username, password) {
        return ajax({
            url: '/public/users/login',
            type: 'POST',
            data: {
                username,
                password
            }
        }).done((data) => {
            this.set({
                isLogin: true,
                username: username,
                password: ''
            })
            this.trigger('login-success')
        }).fail((data) => {
            this.set({
                isLogin: false,
                username: ''
            })
            this.trigger('login-error')
        })
    },

    logout() {
        return ajax({
            url: '/public/users/logout,
            type: 'POST'
        })
    }

});

let authModelInstance = new AuthModel()

export default AuthModel
export { authModelInstance }
