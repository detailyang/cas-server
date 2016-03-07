import 'antd/lib/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import ajax from './utils/ajax';
import { Menu, Form, Input, Button, Checkbox, Radio, Row, Col, Tooltip, Icon } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

let People = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.form);
    console.log('收到表单值：', this.props.form.getFieldsValue());
  },
  handleChange(field, e) {
    this.setState({[field]: e.target.value});
  },
  getInitialState() {
    ajax({url: '/api/users/self'})
    .done((data) => {
      console.log(data);
      this.setState({
        username: data.value.username
      })
    })
    .fail((msg, resp) => {
      console.log(msg, resp);
    })
    return {
        chinesename: '',
        mobile: '',
        username: '',
        email: '',
        aliasname: ''
      };
    },
  render() {
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 5,
        offset: 5
      },
      wrapperCol: {
        span: 4
      },
    };
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="用户名：">
          <Input
            disabled
            value={this.state.username}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="性别：">
          <RadioGroup {...getFieldProps('gender', { initialValue: 'female' })}>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          inline
          {...formItemLayout}
          label="花名：">
          <Input
            {...getFieldProps('aliasname', {initialValue: this.state.aliasname})}
          />
        </FormItem>
        <FormItem
          inline
          {...formItemLayout}
          label="中文名：">
          <Input
            {...getFieldProps('chinesename', {initialValue: this.state.chinesename})}
          />
        </FormItem>
        <FormItem
          inline
          {...formItemLayout}
          label="手机号：">
          <Input
            {...getFieldProps('mobile', {initialValue: this.state.mobile})}
          />
        </FormItem>
        <FormItem
          inline
          {...formItemLayout}
          label="邮箱：">
          <Input
            {...getFieldProps('email', {initialValue: this.state.email})}
          />
        </FormItem>
        <FormItem
          inline
          {...formItemLayout}
          label="key：">
          <Input type="textarea" placeholder="ssh public key" {...getFieldProps('key')} />
        </FormItem>
        <Row>
          <Col span="14" offset="11">
            <Button type="primary" htmlType="submit">确定</Button>
          </Col>
        </Row>
      </Form>
    );
  }
});

People = Form.create()(People);

var App = React.createClass({
    getInitialState() {
      return {
        current: 'mail'
      };
    },
    handleClick(e) {
      console.log('click ', e);
      this.setState({
        current: e.key
      });
    },
    render() {
        return (
          <div>
          <Menu onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            theme={this.state.theme}
            mode="horizontal">
            <Menu.Item key="mail">
              <Icon type="mail" />导航一
            </Menu.Item>
            <Menu.Item key="app" disabled>
              <Icon type="appstore" />导航二
            </Menu.Item>
            <SubMenu title={<span><Icon type="setting" />导航 - 子菜单</span>}>
              <MenuItemGroup title="分组1">
                <Menu.Item key="setting:1">选项1</Menu.Item>
                <Menu.Item key="setting:2">选项2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="分组2">
                <Menu.Item key="setting:3">选项3</Menu.Item>
                <Menu.Item key="setting:4">选项4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <Menu.Item key="alipay">
              <a href="http://www.alipay.com/" target="_blank">导航四 - 链接</a>
            </Menu.Item>
          </Menu>
          <People>
          </People>
          </div>
        );
    }
});


ReactDOM.render(<App />, document.getElementById('app'));
