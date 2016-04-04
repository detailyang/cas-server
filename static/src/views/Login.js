/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-14T10:30:11+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-04T23:15:58+08:00
* @License: The MIT License (MIT)
*/


import './login.scss';

import React from 'react';
import Antd, { Form, Input, Row, Col, Button } from 'antd';

import FormValidate from '../mixins/FormValidate';
import { authModelInstance } from '../models/Auth';

const noop = () => {};

export default React.createClass({

  propTypes: {
    onOk: React.PropTypes.func,
  },

  mixins: [FormValidate],

  getDefaultProps() {
    return {
      onOk: noop,
    };
  },

  getInitialState() {
    return { formData: authModelInstance.toJSON(), loading: false };
  },

  handleLoginClick(e) {
    const _this = this;
    e.preventDefault();
    const username = this.state.formData.username;
    const password = this.state.formData.password;

    this.setState({ loading: true });

    authModelInstance.login(username, password).done(() => {
      _this.props.onOk();
    }).fail((msg, resp) => {
      this.setState({ loading: false });
      const info = resp.code
        ? resp.data.value || msg
        : msg;
      Antd.message.error(info, 3);
    });
  },

  render() {
    const formData = this.state.formData;

    return (
      <div>
        <div className="login-backdrop"></div>
        <div className="login-modal">
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <Form.Item label="用户名：">
                  <Input
                    value={formData.username}
                    placeholder="填写字母、下划线、数字"
                    onChange={this.setValue.bind(this, 'username')}
                  />
                </Form.Item>
                <Form.Item label="密码：">
                  <Input
                    type="password"
                    value={formData.password || ''}
                    onChange={this.setValue.bind(this, 'password')}
                  />
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
                  loading={this.state.loading}
                  onClick={this.handleLoginClick}
                >
                  登录
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  },

});
