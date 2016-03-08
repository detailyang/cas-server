import _ from 'underscore'
import React from 'react'
import Antd, {Table, Button, Input, Icon} from 'antd'
const InputGroup = Input.Group

import UserEditModal from '../components/UserEditModal'
import ModelMixin from '../mixins/model'
import UserModel from '../models/User'

export default React.createClass({

    mixins: [ModelMixin],

    getInitialState() {
        this.model = new UserModel()

        return _.extend({
            editModalVisible: false,
            editModalId: 0
        }, this.model.toJSON())
    },

    render() {
        return (
            <div>
                {this.renderEditModal()}
                {this.renderFilter()}
                {this.renderTable()}
            </div>
        )
    },

    renderEditModal() {
        if (!this.state.editModalVisible) return

        let handleOk = () => {
            this.setState({ editModalVisible: false })
            this.model.fetch()
        }

        let handleCancel = () => {
            this.setState({ editModalVisible: false })
        }

        return <UserEditModal
            id={this.state.editModalId}
            visible={this.state.editModalVisible}
            onOk={handleOk}
            onCancel={handleCancel} />
    },

    renderFilter() {
        return (
            <div style={{marginBottom: '10px'}}>
                <Button type="primary" onClick={this.handleCreateClick}>
                    <Icon type="plus" />新建
                </Button>
                <div style={{float: 'right'}}>
                    <InputGroup className="ant-search-input" sytle={{float: 'left'}}  size="large">
                        <Input defaultValue={this.state.keyword}
                            onChange={this.handleKeywordChange}
                            onKeyDown={this.handleKeywordKeyDown} />
                        <div className="ant-input-group-wrap">
                            <Button className="ant-search-btn" onClick={this.handleSearchClick}>
                                <Icon type="search" />
                            </Button>
                        </div>
                    </InputGroup>
                </div>
            </div>
        )
    },

    renderTable() {
        const model = this.model
        const columns = [
            {title: 'id', dataIndex: 'id', key: 'id'},
            {title: '头像', dataIndex: 'avatar', key: 'avatar'},
            {title: '用户名', dataIndex: 'username', key: 'username'},
            {title: '真实姓名', dataIndex: 'chinesename', key: 'chinesename'},
            {title: '花名', dataIndex: 'aliasname', key: 'aliasname'},
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
    },

    handleCreateClick() {
        this.setState({
            editModalVisible: true,
            editModalId: 0
        })
    },

    handleEditClick(record) {
        this.setState({
            editModalVisible: true,
            editModalId: record.id
        })
    },

    handleDeleteClick(record) {
        this.model.delete(record.id).done(() => {
            Antd.message.success('删除成功')
            this.model.fetch()
        }).fail(() => {
            Antd.message.error('删除失败')
        })
    }

})
