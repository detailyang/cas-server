import Backbone from 'backbone'
import React from 'react'
import {Menu} from 'antd'

export default React.createClass({

    getInitialState() {
        return {
            current: this.props.current
        }
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            current: nextProps.current
        })
    },

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                theme=''
                mode="horizontal">

                <Menu.Item key="user">用户列表</Menu.Item>
                <Menu.Item key="oauth">OAuth列表</Menu.Item>
                <Menu.Item key="personal">个人信息</Menu.Item>

            </Menu>
        )
    },

    handleClick(e) {
        Backbone.history.navigate(`!/${e.key}`, {trigger: true})
    }
})
