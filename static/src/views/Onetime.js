/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-14T10:30:11+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-05T01:06:21+08:00
* @License: The MIT License (MIT)
*/


import './login.scss';

import React from 'react';
import Antd, { Form, Input, Row, Col, Button } from 'antd';
import Ajax from '../utils/ajax';

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
    e.preventDefault();
    const username = this.state.formData.username;
    const password = this.state.formData.password;

    this.setState({ loading: true });

    Ajax({
      url: `/public/oauth/onetime${location.search}`,
      type: 'POST',
      data: {
        username,
        password,
      },
    })
    .done((res) => {
      location.href = res.value;
    })
    .fail((err, resp) => {
      Antd.message.error((resp.data && resp.data.value) || err, 3);
    })
    .always(() => {
      this.setState({ loading: false });
    });
  },

  render() {
    const formData = this.state.formData;
    let passwordfield = '静态密码';

    switch (window._authtype) {
      case 1:
        passwordfield = '静态密码';
        break;
      case 2:
        passwordfield = '动态密码';
        break;
      case 3:
        passwordfield = '静态+动态密码';
        break;
      default:
        break;
    }

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
                <Form.Item label={`${passwordfield}:`}>
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
