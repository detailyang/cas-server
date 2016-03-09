import React from 'react'
import _ from 'underscore'
import { Form, Input, Button, Checkbox, Radio, Row, Col, Tooltip, Icon } from 'antd'
import UserEditModal from '../components/UserEditModal'
import Personal from '../components/Personal'
import ModelMixin from '../mixins/model'
import UserModel from '../models/User'
import ResetPassword from '../components/ResetPassword'


export default React.createClass({
    getInitialState() {
        this.model = new UserModel()

        return _.extend({
            id: 0
        }, this.model.toJSON())
    },

    render() {
        return (
            <div>
                {this.renderInfo()}
                {this.renderPassword()}
            </div>
        )
    },

    renderInfo() {
        return <Personal/>
    },

    renderPassword() {
        return <ResetPassword />
    },
})
