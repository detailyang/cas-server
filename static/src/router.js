import Backbone from 'backbone'
import React from 'react'
import ReactDOM from 'react-dom'

import Header from './components/Header'
import Nav from './components/Nav'

import User from './views/User'
import OAuth from './views/OAuth'
import Personal from './views/Personal'
import Password from './views/Password'

export default Backbone.Router.extend({

    routes: {
        '!/user': 'user',
        '!/oauth': 'oauth',
        '!/personal': 'personal',
        '!/password': 'password',
        '*index': 'index'
    },

    initialize() {
        this.header = document.getElementById('header')
        this.nav = document.getElementById('nav')
        this.app = document.getElementById('app')

        this.show(Header, null, this.header)
        this.show(Nav, {current: 'user'}, this.nav)
    },

    user() {
        this.show(User)
        this.show(Nav, {current: 'user'}, this.nav)
    },

    oauth() {
        this.show(OAuth)
        this.show(Nav, {current: 'oauth'}, this.nav)
    },

    personal() {
        this.show(Personal)
        this.show(Nav, {current: 'personal'}, this.nav)
    },

    password() {
        this.show(Password)
        this.show(Nav, {current: 'password'}, this.nav)
    },

    index() {
        this.navigate('!/user', {trigger: true, replace: true})
    },

    show(components, props, node) {
        ReactDOM.render(
            React.createElement(components, props),
            node || this.app
        )
    }

})
