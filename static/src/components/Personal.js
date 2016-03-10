import React from 'react'
import Antd, {Modal, Upload, Icon, Form, Button, Input, Radio, Row, Col} from 'antd'
import FormValidate from '../mixins/FormValidate'
import PersonalModel from '../models/Personal'
import EditModal from '../mixins/EditModal'
import ChangePassword from '../components/ChangePassword'
import DynamicPassword from '../components/DynamicPassword'

const RadioGroup = Radio.Group
const FormItem = Form.Item
const noop = function() {}

export default React.createClass({
    mixins: [FormValidate, EditModal],

    getInitialState() {
        this.model = new PersonalModel()

        return {
            formData: this.model.toJSON(),
            formErrors: {},
            confirmLoading: false
        }
    },

    componentWillMount() {
        this.model.fetch().done(() => {
            this.setState({
                formData: this.model.toJSON()
            })
        }).fail((msg) => {
            Antd.message.error(msg, 3)
        })
    },

    render() {
      const formData = this.state.formData
      const formErrors = this.state.formErrors
      const errorStatus = (field) => formErrors[field] ? 'error' : ''
      const help = (field) => formErrors[field]
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      const style = {
        'margin': '10px'
      }

      return (
        <div>
          <div className="row-flex row-flex-center">
            <div className="col-12 box">
            <Form>
              <FormItem className="row-flex row-flex-center">
              <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}>
                  <img src="/api/users/self/avatar" width="120" className="avatar"/>
              </Upload>
              </FormItem>
                <Row>
                <Col span="11">
                <Form.Item label="用户名：" validateStatus={errorStatus('username')} help={help('username')}>
                    <Input
                      disabled
                      value={formData.username}
                      placeholder="填写字母、下划线、数字"
                      onChange={this.setValue.bind(this, 'username')} />
                </Form.Item>
                </Col>
                <Col span="11" offset="2">
                <Form.Item label="性别：" validateStatus={errorStatus('gender')} help={help('gender')}>
                    <RadioGroup value={formData.gender + ''} onChange={this.setValue.bind(this, 'gender')}>
                        <Radio value="0">男</Radio>
                        <Radio value="1">女</Radio>
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
                <Form.Item label="Email：" validateStatus={errorStatus('email')} help={help('email')}>
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
                        type="textarea"
                        value={formData.key}
                        placeholder="your public ssh key (cat ~/.ssh/id_rsa.pub|pbcopy)"
                        rows="4"
                        onChange={this.setValue.bind(this, 'key')} />
                </Form.Item>
                <Row className="row-flex row-flex-end">
                    <ChangePassword
                      onSubmit={this.onChangePassword}
                    />
                    <DynamicPassword
                      onSubmit={this.onDynamicPassword}
                      value={formData.notp}
                    />
                    <Button
                    style={style}
                    type="primary" htmlType="submit" onClick={this.onSubmit}>更新</Button>
                </Row>
            </Form>
            </div>
          </div>
        </div>
        )
    },

    onChangePassword(oldpassword, newpassword) {
      this.model.resetPassword(oldpassword, newpassword).done(() => {
          Antd.message.success('修改密码成功')
      }).fail((msg) => {
          Antd.message.error(msg)
      });
    },

    onDynamicPassword(password) {
      this.model.checkDynamicPassword(password).done(() => {
          Antd.message.success('校验成功');
      }).fail((msg) => {
          Antd.message.error('校验失败');
      });
    },

    onSubmit(form) {
      this.model.save().done(()=> {
          Antd.message.success('更新成功');
      }).fail((msg) => {
          Antd.message.success('更新失败');
      });
    }
})