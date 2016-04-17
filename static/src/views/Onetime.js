/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-14T10:30:11+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-17T14:56:23+08:00
* @License: The MIT License (MIT)
*/


import './login.scss';

import React from 'react';
import Antd, { Form, Input, Row, Col, Button } from 'antd';
import querystring from 'querystring';
import Ajax from '../utils/ajax';
import url from 'url';

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
    const qs = querystring.parse(url.parse(location.href).query);
    const name = qs.name || '';
    const AvatarStyle = {
      height: 100,
      width: 100,
      borderRadius: '50%',
    };
    const IconStyle = {
      'fontSize': 16,
      'marginRight': 16,
    };
    const CheckIconStyle = {
      'fontSize': 16,
      color: '#79d858',
    };
    const Style = {
      'marginTop': 100,
    };
    const H1Style = {
      'color': '#333',
    };
    const NameStyle = {
      color: 'red',
    };
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <div>
      <div className="row-flex row-flex-center">
        <div
          className="col-12 box"
          style={Style}
        >
        <Row style={{
          'borderBottom': '1px solid #ddd',
          'marginBottom': 15,
        }}
        >
          <Col span="18">
            <h1 style={H1Style}>Authorize application</h1>
            <p>
              <strong style={NameStyle}>{name}</strong> would like permission to access your account
            </p>
          </Col>
          <Col span="6">
            <img
              style={AvatarStyle}
              src="/api/users/self/avatar"
            />
          </Col>
        </Row>
        <Row>
        <div
          style = {{
            border: '1px solid #ddd',
            padding: '25px',
          }}
        >
          <Form
            onSubmit={this.handleSubmit}
            horizontal
          >
            <Row>
              <Col>
                <Form.Item {...formItemLayout} label="用户名：">
                  <Input
                    value={formData.username}
                    placeholder="填写字母、下划线、数字"
                    onChange={this.setValue.bind(this, 'username')}
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} label={`${passwordfield}：`}>
                  <Input
                    type="password"
                    value={formData.password || ''}
                    onChange={this.setValue.bind(this, 'password')}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span="8" offset="8">
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
        </Row>
      </div>
      </div>


      </div>
    );
  },

});
