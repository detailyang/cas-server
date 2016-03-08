import React from 'react'
import {Table} from 'antd'

import ModelMixin from '../mixins/model'
import UserModel from '../models/User'

export default React.createClass({

    mixins: [ModelMixin],

    getInitialState() {
        this.model = new UserModel()

        return this.model.toJSON()
    },

    render() {
        return (
            <div>
                {this.renderTable()}
            </div>
        )
    },

    renderTable() {
        const model = this.model
        const columns = [
            {title: 'id', dataIndex: 'id', key: 'id'},
            {title: '头像', dataIndex: 'avatar', key: 'avatar'},
            {title: '用户名', dataIndex: 'username', key: 'username'},
            {title: '真实姓名', dataIndex: 'realname', key: 'realname'},
            {title: 'email', dataIndex: 'email', key: 'email'},
            {title: '手机', dataIndex: 'mobile', key: 'mobile'},
            {title: '操作', dataIndex: 'x', key: 'x'}
        ]
        const pagination = {
            total: model.get('total'),
            current: model.get('page'),
            pageSize: model.get('per_page'),
            showTotal: (total) => `共 ${total} 条`,
            onChange: (page) => {
                this.setState({loading: true})
                model.set('page', page).fetch()
            }
        }
        return <Table
            dataSource={this.state.value}
            loading={this.state.loading}
            columns={columns}
            pagination={pagination}
        />
    }

})
