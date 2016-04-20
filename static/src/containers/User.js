/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-14T10:30:11+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-20T19:42:53+08:00
* @License: The MIT License (MIT)
*/


import React, { Component } from 'react'
import Antd, { Table, Button, Row, Col, Input, Icon, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import classNames from 'classnames'

import UserEditModal from './UserEditModal'
import { fetchUserList, setUserPage, setUserKeyword, deleteUser, resetUser } from '../actions'

const InputGroup = Input.Group

class User extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editModalVisible: false,
      editModalId: 0,
    }
  }

  componentWillMount() {
    this.fetchUserList()
  }

  handleCreateClick() {
    this.setState({ editModalVisible: true, editModalId: 0 })
  }

  handleEditClick(record) {
    this.setState({ editModalVisible: true, editModalId: record.id })
  }

  handleResetClick(record) {
    this.props.resetUser(record.id)
      .then(() => Antd.message.success('重置成功'))
      .catch(() => Antd.message.error('重置失败'))
  }

  handleDeleteClick(record) {
    this.props.deleteUser(record.id)
      .then(() => {
        Antd.message.success('删除成功')
        this.fetchUserList()
      })
      .catch(() => {
        Antd.message.error('删除失败')
      })
  }

  handleKeywordKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleSearchClick()
    }
  }

  handleSearchClick() {
    this.fetchUserList()
  }

  renderTable() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '状态',
        dataIndex: 'is_delete',
        key: 'is_delete',
        filters: [
          {
            text: '在职',
            value: '0',
          }, {
            text: '离职',
            value: '1',
          },
        ],
        render(value) {
          return (
            <div>
              {value === false
                ? <span className="green-point" style={{ marginRight: 4 }}>
              </span>
                : <span className="black-point" style={{ marginRight: 4 }}>
                </span>}
              {value === false
                ? '在职'
                : '离职'}
            </div>
          )
        },
      }, {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '真实姓名',
        dataIndex: 'realname',
        key: 'realname',
      }, {
        title: '花名',
        dataIndex: 'aliasname',
        key: 'aliasname',
      }, {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: '手机',
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '操作',
        dataIndex: 'x',
        key: 'x',
        className: 'text-rigth',
        render: (value, record) => {
          return (
            <div>
              <Popconfirm
                placement="left"
                title="确认重置？"
                onConfirm={() => this.handleResetClick(record)}
              >
                <Button type="ghost" size="small">重置</Button>
              </Popconfirm>
              <Button type="ghost" size="small"
                onClick={() => this.handleEditClick(record)}
              >
                编辑
              </Button>
              <Popconfirm
                placement="left"
                title="确认删除？"
                onConfirm={() => handleDeleteClick(record)}
              >
                <Button type="ghost" size="small">删除</Button>
              </Popconfirm>
            </div>
          )
        },
      },
    ]

    let {
      user:{ list, loading, total, page, per_page },
      setOAuthPage
    } = this.props

    list.forEach(item => item.key = item.id)

    const pagination = {
      total,
      current: page,
      pageSize: per_page,
      showTotal: (total) => `共 ${total} 条`,
      onChange: (page) => {
        setOAuthPage(page)
        this.fetchUserList()
      }
    }

    return (
      <Table
        dataSource={list}
        loading={loading}
        columns={columns}
        pagination={pagination}
      />)
  }

  renderEditModal() {
    if (!this.state.editModalVisible) {
      return ''
    }

    const handleOk = () => {
      this.setState({ editModalVisible: false })
      this.fetchUserList()
    }

    const handleCancel = () => {
      this.setState({ editModalVisible: false })
    }

    return (
      <UserEditModal
        id={this.state.editModalId}
        visible={this.state.editModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />)
  }

  renderFilter() {
    const { setUserKeyword } = this.props

    return (
      <Row style={{ marginBottom: '10px' }}>
        <Col span="2">
          <Button type="primary" onClick={::this.handleCreateClick}>
            <Icon type="plus" />新建
          </Button>
        </Col>
        <Col span="8" offset="14" style={{left: '30px'}}>
          <InputGroup className="ant-search-input" size="large">
            <Input
              defaultValue={this.state.keyword}
              onChange={e => { setUserKeyword(e.target.value) }}
              onKeyDown={::this.handleKeywordKeyDown}
            />
          <div className="ant-input-group-wrap">
              <Button className="ant-search-btn" onClick={this.handleSearchClick}>
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <div>
        {this.renderEditModal()}
        {this.renderFilter()}
        {this.renderTable()}
      </div>
    )
  }

  fetchUserList() {
    return this.props.fetchUserList()
      .catch(error => Antd.message.error(error.message))
  }
}

export default connect(
  ({user}) => ({user}),
  { fetchUserList, setUserPage, setUserKeyword, deleteUser, resetUser }
)(User)
