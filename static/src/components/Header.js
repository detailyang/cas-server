/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-14T10:30:11+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T16:46:31+08:00
* @License: The MIT License (MIT)
*/


import React from 'react';
import { Menu, Dropdown } from 'antd';
import $ from 'jquery';

const HandleLogout = () => {
  $.ajax({ url: '/public/users/logout', type: 'POST' }).done(() => {
    location.href = '/';
  });
};

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="#" onClick={HandleLogout}>登出</a>
    </Menu.Item>
  </Menu>
);

const AvatarStyle = {
  height: 30,
  width: 30,
  borderRadius: '50%',
};

const HeaderStyle = {
  height: 48,
  float: 'right',
};

const OptStyle = {
  fontSize: 16,
  marginRight: 20,
  marginTop: 10,
  display: 'inline-block',
};

export default React.createClass({
  render() {
    return (
      <div style={HeaderStyle}>
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#" style={OptStyle}>
            <img style={AvatarStyle}
              src="/api/users/self/avatar"
            >
            </img>
          </a>
        </Dropdown>
      </div>
    );
  },
});
