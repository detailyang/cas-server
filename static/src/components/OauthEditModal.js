import React from 'react'
import Antd, {
    Modal,
    Tooltip,
    Icon,
    Checkbox,
    Form,
    Input,
    Radio,
    Row,
    Col
} from 'antd'
import OauthEditModel from '../models/OauthEdit'
import FormValidate from '../mixins/FormValidate'
import EditModal from '../mixins/EditModal'

const RadioGroup = Radio.Group
const noop = function() {}

export default React.createClass({

    mixins: [
        FormValidate, EditModal
    ],

    defaultProps: {
        id: 0,
        visible: false,
        onOk: noop,
        onCancel: noop
    },

    getInitialState() {
        this.model = new OauthEditModel({id: this.props.id})

        return {formData: this.model.toJSON(), formErrors: {}, confirmLoading: false}
    },

    componentWillMount() {
        if (this.props.id) {
            this.model.fetch().done(() => {
                this.setState({formData: this.model.toJSON()})
            }).fail((msg) => {
                Antd.message.error(msg, 3)
            })
        }
    },

    render() {
        const formData = this.state.formData
        const formErrors = this.state.formErrors
        const errorStatus = (field) => formErrors[field]
            ? 'error'
            : ''
        const help = (field) => formErrors[field]

        return (
            <Modal title={this.props.id
                ? '编辑'
                : '新建'} visible={this.props.visible} confirmLoading={this.state.confirmLoading} onOk={this.handleEditModalOk} onCancel={this.handleEditModalCancel}>
                <Form>
                    <Form.Item label="name: " validateStatus={errorStatus('name')} help={help('username')}>
                        <Input value={formData.name} placeholder="填写字母、下划线、数字" onChange={this.setValue.bind(this, 'name')}/>
                    </Form.Item>
                    <Form.Item label="secret: " validateStatus={errorStatus('secret')} help={help('secret')}>
                        <Input disabled value={formData.secret} onChange={this.setValue.bind(this, 'secret')}/>
                    </Form.Item>
                    <Row>
                        <Col span="11">
                            <Form.Item label="domain: " validateStatus={errorStatus('domain')} help={help('domain')}>
                                <Input value={formData.domain} onChange={this.setValue.bind(this, 'domain')}/>
                            </Form.Item>
                        </Col>
                        <Col span="11" offset="2">
                            <Form.Item label="callback_url: " validateStatus={errorStatus('callback_url')} help={help('callback_url')}>
                                <Input value={formData.callback_url} onChange={this.setValue.bind(this, 'callback_url')}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="desc: " validateStatus={errorStatus('desc')} help={help('desc')}>
                        <Input value={formData.desc} onChange={this.setValue.bind(this, 'desc')}/>
                    </Form.Item>
                    <Form.Item label={< span > admin < Tooltip title = "具有admin权限" > <Icon type="question-circle-o"/> < /Tooltip>: </span >} validateStatus={errorStatus('is_admin')} help={help('is_admin')}>
                        <label>
                            <Checkbox checked={formData.is_admin
                                ? 1
                                : 0} onChange={this.setValue.bind(this, 'is_admin')}/>
                            增加admin权限
                        </label>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
})
