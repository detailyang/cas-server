/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-14T10:30:11+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T11:16:47+08:00
* @License: The MIT License (MIT)
*/


import './login.scss';

import React, { Component } from 'react';
import Antd, { Form, Input, Row, Col, Button } from 'antd';
import { reduxForm } from 'redux-form';

import { login } from '../actions';

const noop = () => {};

const Login = React.createClass({

  propTypes: {
    onOk: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      onOk: noop,
    };
  },

  render() {
    return (
      <div>
        <div className="login-backdrop"></div>
        <div className="login-modal">
          <LoginForm/>
        </div>
      </div>
    );
  },

});


let LoginForm = ({ fields: {username, password}, submitting, handleSubmit }) => {
  let loginWrapped = (...args) =>
    login(...args).catch(error =>
      Antd.message.error(error.message, 3))

  return (
    <Form onSubmit={handleSubmit(loginWrapped)}>
      <Row>
        <Col>
          <Form.Item label="用户名：">
            <Input placeholder="填写字母、下划线、数字" {...username} />
          </Form.Item>
          <Form.Item label="密码：">
            <Input type="password" placeholder="输入密码" {...password} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: '100%' }}
            loading={submitting}
          >
            登录
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

LoginForm = reduxForm({
  form: 'login',
  fields: ['username', 'password']
})(LoginForm)



export default Login;
