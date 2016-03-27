/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-14T10:30:11+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T11:50:05+08:00
* @License: The MIT License (MIT)
*/


import Backbone from 'backbone';
import React, { Component } from 'react';
import { Menu } from 'antd';

export default ({ isAdmin, currentPath }) => {
  let style = isAdmin ? null : { display: 'none' }
  return (
    <Menu
      selectedKeys={[currentPath]}
      theme=""
      mode="horizontal"
    >
      <Menu.Item key="user" style={style}>用户列表</Menu.Item>
      <Menu.Item key="oauth" style={style}>OAuth列表</Menu.Item>
      <Menu.Item key="/dashboard">个人信息</Menu.Item>
    </Menu>
  )
}