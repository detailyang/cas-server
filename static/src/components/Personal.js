/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-11T12:16:28+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T11:05:57+08:00
* @License: The MIT License (MIT)
*/


import React from 'react';
import Antd, {
    Upload,
    Form,
    Button,
    Input,
    Radio,
    Row,
    Col,
} from 'antd';
import FormValidate from '../mixins/FormValidate';
import PersonalModel from '../models/Personal';
import EditModal from '../mixins/EditModal';
import ChangePassword from '../components/ChangePassword';
import DynamicPassword from '../components/DynamicPassword';


const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const noop = () => {};

export default React.createClass({
  propTypes: {
    onOk: React.PropTypes.func,
    onUpload: React.PropTypes.func,
    onCancel: React.PropTypes.func,
  },

  mixins: [
    FormValidate, EditModal,
  ],

  getDefaultProps() {
    return {
      onOk: noop,
      onUpload: noop,
      onCancel: noop,
    };
  },

  getInitialState() {
    this.model = new PersonalModel();

    return {
      formData: this.model.toJSON(),
      formErrors: {},
      confirmLoading: false,
      onOk: noop,
    };
  },

  componentWillMount() {
    this.model.fetch().done(() => {
      this.setState({ formData: this.model.toJSON() });
    }).fail((msg) => {
      Antd.message.error(msg, 3);
    });
  },

  handleChangePassword(oldpassword, newpassword) {
    this.model.resetPassword(oldpassword, newpassword).done(() => {
      Antd.message.success('修改密码成功');
    }).fail((msg, resp) => {
      const info = resp.code !== 0 && resp.data.value ? resp.data.value : msg;
      Antd.message.error(info);
    });
  },

  changeDynamicPassword(password) {
    this.model.checkDynamicPassword(password).done(() => {
      Antd.message.success('校验成功');
    }).fail(() => {
      Antd.message.error('校验失败');
    });
  },

  handleSubmit(e) {
    e.preventDefault();
    this.model.set(this.state.formData).save().always(() => {
      this.setState({ confirmLoading: false });
    }).done(() => {
      const msg = this.model.get('id') ? '编辑成功' : '创建成功';
      Antd.message.success(msg);
      this.props.onOk();
    }).fail((msg, resp) => {
      if (resp.data && resp.data.errors) {
        this.setState({ formErrors: resp.data.errors });
      }
      Antd.message.error(msg, 3);
    });
  },

  render() {
    const formData = this.state.formData;
    const formErrors = this.state.formErrors;
    const errorStatus = (field) => formErrors[field] ? 'error' : '';
    const help = (field) => formErrors[field];
    const style = {
      margin: '10px',
    };
    return (
      <div>
        <div className="row-flex row-flex-center">
          <div className="col-12 box">
            <Form onSubmit={this.handleSubmit}>
              <FormItem className="row-flex row-flex-center">
                <Upload
                  showUploadList={false}
                  name="avatar"
                  action="/api/users/self/avatar"
                  onChange={this.props.onUpload}
                >
                  <img src={`/api/users/self/avatar?${new Date().getTime()}`}
                    width="120"
                    className="avatar"
                  />
                </Upload>
              </FormItem>
              <Row>
                <Col span="11">
                  <Form.Item
                    label="用户名："
                    validateStatus={errorStatus('username')}
                    help={help('username')}
                  >
                    <Input disabled value={formData.username} />
                  </Form.Item>
                </Col>
                <Col span="11" offset="2">
                  <Form.Item
                    label="性别："
                    validateStatus={errorStatus('gender')}
                    help={help('gender')}
                  >
                    <RadioGroup
                      value={formData.gender ? 1 : 0}
                      onChange={this.setValue.bind(this, 'gender')}
                    >
                      <Radio value={0}>男</Radio>
                      <Radio value={1}>女</Radio>
                    </RadioGroup>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span="11">
                  <Form.Item
                    label="真实姓名："
                    validateStatus={errorStatus('realname')}
                    help={help('realname')}
                  >
                    <Input
                      value={formData.realname}
                      onChange={this.setValue.bind(this, 'realname')}
                    />
                  </Form.Item>
                </Col>
                <Col span="11" offset="2">
                  <Form.Item
                    label="花名："
                    validateStatus={errorStatus('aliasname')}
                    help={help('aliasname')}
                  >
                    <Input
                      value={formData.aliasname}
                      onChange={this.setValue.bind(this, 'aliasname')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span="11">
                  <Form.Item
                    label="Email："
                    validateStatus={errorStatus('email')}
                    help={help('email')}
                  >
                    <Input
                      value={formData.email}
                      onChange={this.setValue.bind(this, 'email')}
                    />
                  </Form.Item>
                </Col>
                <Col span="11" offset="2">
                  <Form.Item
                    label="手机号："
                    validateStatus={errorStatus('mobile')}
                    help={help('mobile')}
                  >
                    <Input
                      value={formData.mobile}
                      onChange={this.setValue.bind(this, 'mobile')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Key：" validateStatus={errorStatus('key')} help={help('key')}>
                <Input
                  type="textarea"
                  value={formData.key}
                  placeholder="your public ssh key (cat ~/.ssh/id_rsa.pub|pbcopy)"
                  rows="4"
                  onChange={this.setValue.bind(this, 'key')}
                />
              </Form.Item>
              <Row className="row-flex row-flex-end">
                <ChangePassword onSubmit={this.handleChangePassword} />
                <DynamicPassword
                  onSubmit={this.changeDynamicPassword}
                  value={formData.notp}
                />
                <Button style={style} type="primary" htmlType="submit">更新</Button>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    );
  },
});
