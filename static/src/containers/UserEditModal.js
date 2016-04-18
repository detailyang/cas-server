/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-14T10:30:11+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-16T15:07:40+08:00
* @License: The MIT License (MIT)
*/


import React from 'react'
import Antd, {
  Modal,
  Form,
  Input,
  Radio,
  Row,
  Col,
} from 'antd'
import { reduxForm } from 'redux-form'
import { saveUser, getUser } from '../actions'

const RadioGroup = Radio.Group
const noop = () => {}

const UserEditModal = React.createClass({

  propTypes: {
    id: React.PropTypes.number,
    visible: React.PropTypes.bool,
    onOk: React.PropTypes.func,
    onCancel: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      id: 0,
      visible: false,
      onOk: noop,
      onCancel: noop,
    }
  },

  getInitialState() {
    return {
      formErrors: {}
    }
  },

  componentWillMount() {
    const { id, getUser, initializeForm } = this.props
    if (id) {
      getUser(id)
        .then(data => initializeForm(data.value))
        .catch(error => Antd.message.error(error.message, 3))
    }
  },

  render() {
    const {
      fields: {
        username, realname, aliasname, email, mobile, gender, is_admin, is_delete, key
      },
      handleSubmit, submitting
    } = this.props
    const formErrors = this.state.formErrors
    const errorStatus = (field) => formErrors[field] ? 'error' : ''
    const help = (field) => formErrors[field]

    return (
      <Modal title={this.props.id ? '编辑' : '新建'}
        visible={this.props.visible}
        confirmLoading={submitting}
        onOk={handleSubmit(this.saveUser)}
        onCancel={this.props.onCancel}
      >
        <Form>
          <Form.Item label="用户名：" validateStatus={errorStatus('username')} help={help('username')}>
            <Input {...username} placeholder="填写字母、下划线、数字"/>
          </Form.Item>
          <Row>
            <Col span="11">
              <Form.Item
                label="真实姓名："
                validateStatus={errorStatus('realname')}
                help={help('realname')}
              >
                <Input {...realname}/>
              </Form.Item>
            </Col>
            <Col span="11" offset="2">
              <Form.Item
                label="花名："
                validateStatus={errorStatus('aliasname')}
                help={help('aliasname')}
              >
                <Input {...aliasname}/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <Form.Item label="email：" validateStatus={errorStatus('email')} help={help('email')}>
                <Input {...email}/>
              </Form.Item>
            </Col>
            <Col span="11" offset="2">
              <Form.Item label="手机号：" validateStatus={errorStatus('mobile')} help={help('mobile')}>
                <Input {...mobile}/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <Form.Item label="性别：" validateStatus={errorStatus('gender')} help={help('gender')}>
                <RadioGroup {...gender}
                  onChange={e => gender.onChange(e.target.value)}
                  value={+gender.value}>
                  <Radio name="gender" value={0}>男</Radio>
                  <Radio name="gender" value={1}>女</Radio>
                </RadioGroup>
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item
                label="权限："
                validateStatus={errorStatus('is_admin')}
                help={help('is_admin')}
              >
                <RadioGroup {...is_admin}
                  onChange={e => is_admin.onChange(e.target.value)}
                  value={+is_admin.value}>
                  <Radio name="is_admin" value={0}>普通</Radio>
                  <Radio name="is_admin" value={1}>管理员</Radio>
                </RadioGroup>
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item
                label="状态："
                validateStatus={errorStatus('is_delete')}
                help={help('is_delete')}
              >
                <RadioGroup {...is_delete} 
                  onChange={e => is_delete.onChange(e.target.value)}
                  value={+is_delete.value}>
                  <Radio name="is_delete" value={0}>在职</Radio>
                  <Radio name="is_delete" value={1}>离职</Radio>
                </RadioGroup>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Key：" validateStatus={errorStatus('key')} help={help('key')}>
            <Input {...key} type="textarea" rows="4" />
          </Form.Item>
        </Form>
      </Modal>
    )
  },

  saveUser(values, dispatch) {
    return saveUser(values, dispatch).then(() => {
      const msg = values.id ? '编辑成功' : '创建成功';
      Antd.message.success(msg);
      this.props.onOk();
    })
    .catch(error => {
      this.setState({
        formErrors: error.data.errors
      })
      Antd.message.error(error.message, 3)
    })
  }
})




export default reduxForm({
    form: 'UserEditModal',
    fields: ['id', 'username','realname','aliasname','email','mobile','gender','is_admin','is_delete','key']
  },
  null,
  { getUser }
)(UserEditModal)