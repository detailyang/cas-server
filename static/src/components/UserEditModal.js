import React from 'react'
import Antd, {Modal, Form, Input, Radio, Row, Col} from 'antd'
import UserEditModel from '../models/UserEdit'
import FormValidate from '../mixins/FormValidate'
import EditModal from '../mixins/EditModal'

const RadioGroup = Radio.Group
const noop = function() {}

export default React.createClass({

    mixins: [FormValidate, EditModal],

    defaultProps: {
        id: 0,
        visible: false,
        onOk: noop,
        onCancel: noop
    },

    getInitialState() {
        this.model = new UserEditModel({id: this.props.id})

        return {
            formData: this.model.toJSON(),
            formErrors: {},
            confirmLoading: false
        }
    },

    componentWillMount() {
        if (this.props.id) {
            this.model.fetch().done(() => {
                this.setState({
                    formData: this.model.toJSON()
                })
            }).fail((msg) => {
                Antd.message.error(msg, 3)
            })
        }
    },

    render() {
        const formData = this.state.formData
        const formErrors = this.state.formErrors
        const errorStatus = (field) => formErrors[field] ? 'error' : ''
        const help = (field) => formErrors[field]

        return (
            <Modal
                title={this.props.id ? '编辑' : '新建'}
                visible={this.props.visible}
                confirmLoading={this.state.confirmLoading}
                onOk={this.handleEditModalOk}
                onCancel={this.handleEditModalCancel}>
                <Form>
                    <Form.Item label="用户名：" validateStatus={errorStatus('username')} help={help('username')}>
                        <Input
                            value={formData.username}
                            placeholder="填写字母、下划线、数字"
                            onChange={this.setValue.bind(this, 'username')} />
                    </Form.Item>
                    <Row>
                    <Col span="11">
                    <Form.Item label="性别：" validateStatus={errorStatus('gender')} help={help('gender')}>
                        <RadioGroup value={formData.gender + ''} onChange={this.setValue.bind(this, 'gender')}>
                            <Radio value="0">男</Radio>
                            <Radio value="1">女</Radio>
                        </RadioGroup>
                    </Form.Item>
                    </Col>
                    <Col span="11" offset="2">
                    <Form.Item label="状态：" validateStatus={errorStatus('is_delete')} help={help('is_delete')}>
                        <RadioGroup value={formData.is_delete ? 1 : 0} onChange={this.setValue.bind(this, 'is_delete')}>
                            <Radio value={0}>在职</Radio>
                            <Radio value={1}>离职</Radio>
                        </RadioGroup>
                    </Form.Item>
                    </Col>
                    </Row>
                    <Row>
                        <Col span="11">
                            <Form.Item label="真实姓名：" validateStatus={errorStatus('chinesename')} help={help('chinesename')}>
                                <Input
                                    value={formData.chinesename}
                                    onChange={this.setValue.bind(this, 'chinesename')} />
                            </Form.Item>
                        </Col>
                        <Col span="11" offset="2">
                            <Form.Item label="花名：" validateStatus={errorStatus('aliasname')} help={help('aliasname')}>
                                <Input
                                    value={formData.aliasname}
                                    onChange={this.setValue.bind(this, 'aliasname')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                    <Col span="11">
                    <Form.Item label="email：" validateStatus={errorStatus('email')} help={help('email')}>
                        <Input
                            value={formData.email}
                            onChange={this.setValue.bind(this, 'email')} />
                    </Form.Item>
                    </Col>
                    <Col span="11" offset="2">
                    <Form.Item label="手机号：" validateStatus={errorStatus('mobile')} help={help('mobile')}>
                        <Input
                            value={formData.mobile}
                            onChange={this.setValue.bind(this, 'mobile')} />
                    </Form.Item>
                    </Col>
                    </Row>
                    <Form.Item label="Key：" validateStatus={errorStatus('key')} help={help('key')}>
                        <Input
                            value={formData.key}
                            onChange={this.setValue.bind(this, 'key')} />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
})
