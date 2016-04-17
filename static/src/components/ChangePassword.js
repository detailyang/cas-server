/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-14T10:30:11+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-17T15:01:40+08:00
* @License: The MIT License (MIT)
*/


import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Modal,
} from 'antd';
import React from 'react';
import classNames from 'classnames';
import zxcvbn from 'zxcvbn';

const FormItem = Form.Item;
const noop = () => {};

export default Form.create()(React.createClass({
  propTypes: {
    form: React.PropTypes.object,
    onSubmit: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      form: {},
      onSubmit: noop,
    };
  },

  getInitialState() {
    return {
      passBarShow: false, // 是否显示密码强度提示条
      rePassBarShow: false,
      passStrength: 'H', // 密码强度
      rePassStrength: 'H',
      visible: false,
      onSubmit: noop,
    };
  },

  getPassStrenth(value, type) {
    if (value) {
      const z = zxcvbn(value);
      let strength = 'L';
      // 密码强度的校验规则自定义，这里只是做个简单的示例
      if (z.score <= 1) {
        strength = 'L';
      } else if (z.score <= 2) {
        strength = 'M';
      } else {
        strength = 'H';
      }
      if (type === 'pass') {
        this.setState({ passBarShow: true, passStrength: strength });
      } else {
        this.setState({ rePassBarShow: true, rePassStrength: strength });
      }
    } else {
      if (type === 'pass') {
        this.setState({ passBarShow: false });
      } else {
        this.setState({ rePassBarShow: false });
      }
    }
  },

  handleSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      this.props.onSubmit(values.oldpass, values.pass);
    });
  },


  showModal() {
    this.setState({ visible: true });
  },

  hideModal() {
    this.setState({ visible: false });
  },

  checkPass(rule, value, callback) {
    const form = this.props.form;
    this.getPassStrenth(value, 'pass');

    if (form.getFieldValue('pass')) {
      form.validateFields(['rePass'], { force: true });
    }

    callback();
  },

  checkPass2(rule, value, callback) {
    const form = this.props.form;
    this.getPassStrenth(value, 'rePass');

    if (value && value !== form.getFieldValue('pass')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  },

  renderPassStrengthBar(type) {
    const strength = type === 'pass'
      ? this.state.passStrength
      : this.state.rePassStrength;
    const classSet = classNames({
      'ant-pwd-strength': true,
      'ant-pwd-strength-low': strength === 'L',
      'ant-pwd-strength-medium': strength === 'M',
      'ant-pwd-strength-high': strength === 'H',
    });
    const level = {
      L: '低',
      M: '中',
      H: '高',
    };

    return (
      <div>
        <ul className={classSet}>
          <li className="ant-pwd-strength-item ant-pwd-strength-item-1"></li>
          <li className="ant-pwd-strength-item ant-pwd-strength-item-2"></li>
          <li className="ant-pwd-strength-item ant-pwd-strength-item-3"></li>
          <span className="ant-form-text">
            {level[strength]}
          </span>
        </ul>
      </div>
    );
  },

  render() {
    const { getFieldProps } = this.props.form;

    const oldPassProps = getFieldProps('oldpass', {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '请填写原密码',
        },
      ],
    });
    const passProps = getFieldProps('pass', {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '请填写密码',
        }, {
          validator: this.checkPass,
        },
      ],
    });
    const rePassProps = getFieldProps('rePass', {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '请再次输入密码',
        }, {
          validator: this.checkPass2,
        },
      ],
    });
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 18,
      },
    };
    const style = {
      margin: '10px',
    };

    return (
      <div style={style}>
        <Button type="primary" onClick={this.showModal}>静态密码</Button>
        <Modal
          title="静态密码"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
        >
          <Form horizontal form={this.props.form}>
            <Row>
              <Col span="18">
                <FormItem {...formItemLayout} label="旧密码：">
                  <Input
                    {...oldPassProps}
                    type="password"
                    onContextMenu={noop}
                    onPaste={noop}
                    onCopy={noop}
                    onCut={noop} autoComplete="off" id="oldpass"
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="18">
                <FormItem {...formItemLayout} label="新密码：">
                  <Input
                    {...passProps}
                    type="password"
                    onContextMenu={noop}
                    onPaste={noop}
                    onCopy={noop}
                    onCut={noop}
                    autoComplete="off"
                    id="newpass"
                  />
                </FormItem>
              </Col>
              <Col span="6">
                {this.state.passBarShow
                  ? this.renderPassStrengthBar('pass')
                  : null}
              </Col>
            </Row>

            <Row>
              <Col span="18">
                <FormItem {...formItemLayout} label="确认新密码：">
                  <Input
                    {...rePassProps}
                    type="password"
                    onContextMenu={noop}
                    onPaste={noop}
                    onCopy={noop}
                    onCut={noop}
                    autoComplete="off"
                    id="rePass"
                  />
                </FormItem>
              </Col>
              <Col span="6">
                {this.state.rePassBarShow
                  ? this.renderPassStrengthBar('rePass')
                  : null}
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  },
}));
