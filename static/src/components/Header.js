import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import $ from 'jquery';

const HandleLogout = () => {
    $.ajax({
        url: '/public/users/logout',
        type: 'POST'
    }).done(() => {
        location.href = '/';
    });
}

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="#" onClick={HandleLogout}>登出</a>
        </Menu.Item>
    </Menu>
);

const HeaderStyle = {
    height: 48,
    float: 'right'
};

const OptStyle = {
    fontSize: 16,
    lineHeight: '48px',
    marginRight: 20
}

export default React.createClass({
    render() {
        return (
            <div style={HeaderStyle}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <a
                        className="ant-dropdown-link"
                        href="#"
                        style={OptStyle}>
                        操作<Icon type="down" />
                </a>
            </Dropdown>
        </div>
    )
}
})
