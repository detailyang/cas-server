/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-11T12:16:28+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T21:56:43+08:00
* @License: The MIT License (MIT)
*/


import React, { Component } from 'react';
import Antd, { Table, Button, Input, Icon, Popconfirm } from 'antd';
import { connect } from 'react-redux';

import OAuthEditModal from './OAuthEditModal';

import { fetchOAuthList, setOAuthPage, setOAuthKeyword, deleteOAuth } from '../actions'


const InputGroup = Input.Group;


class OAuth extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editModalVisible: false,
      editModalId: 0,
    }
  }

  componentWillMount() {
    this.fetchOAuthList()
  }

  handleCreateClick() {
    this.setState({ editModalVisible: true, editModalId: 0 });
  }

  handleEditClick(record) {
    this.setState({ editModalVisible: true, editModalId: record.id });
  }

  handleDeleteClick(record) {
    this.props.deleteOAuth(record.id)
      .then(() => {
        Antd.message.success('删除成功');
        this.fetchOAuthList();
      })
      .catch(() => {
        Antd.message.error('删除失败');  
      })
  }

  handleKeywordKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleSearchClick();
    }
  }

  handleSearchClick() {
    this.fetchOAuthList();
  }

  renderEditModal() {
    if (!this.state.editModalVisible) {
      return '';
    }

    const handleOk = () => {
      this.setState({ editModalVisible: false });
      this.fetchOAuthList();
    };

    const handleCancel = () => {
      this.setState({ editModalVisible: false });
    };

    return (
      <OAuthEditModal
        id={this.state.editModalId}
        visible={this.state.editModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />);
  }

  renderFilter() {
    const { setOAuthKeyword } = this.props;
    return (
      <div style={{ marginBottom: '10px' }}>
        <Button type="primary" onClick={::this.handleCreateClick}>
          <Icon type="plus" />新建
        </Button>
        <div style={{ float: 'right' }}>
          <InputGroup className="ant-search-input" sytle={{ float: 'left' }} size="large">
            <Input
              defaultValue={this.state.keyword}
              onChange={e => { setOAuthKeyword(e.target.value) }}
              onKeyDown={this.handleKeywordKeyDown}
            />
            <div className="ant-input-group-wrap">
              <Button className="ant-search-btn" onClick={this.handleSearchClick}>
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
      </div>
    );
  }

  renderTable() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: 'domain',
        dataIndex: 'domain',
        key: 'domain',
      }, {
        title: 'callback',
        dataIndex: 'callback',
        key: 'callback',
      }, {
        title: 'secret',
        dataIndex: 'secret',
        key: 'secret',
      }, {
        title: 'identify',
        dataIndex: 'identify',
        key: 'identify',
      }, {
        title: '操作',
        dataIndex: 'x',
        key: 'x',
        className: 'text-rigth',
        render: (value, record) => {
          return (
            <div>
              <Button
                type="ghost"
                size="small"
                onClick={() => this.handleEditClick(record)}
              >编辑</Button>
              <Popconfirm
                placement="left"
                title="确认删除？"
                onConfirm={() => this.handleDeleteClick(record)}
              >
                <Button type="ghost" size="small">删除</Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
    

    let {
        OAuth:{ list, loading, total, page, per_page },
        setOAuthPage
      } = this.props;

    list.forEach(item => item.key = item.id)

    const pagination = {
      total,
      current: page,
      pageSize: per_page,
      showTotal: (total) => `共 ${total} 条`,
      onChange: (page) => {
        setOAuthPage(page)
        this.fetchOAuthList()
      },
    };

    return (
      <Table
        dataSource={list}
        loading={loading}
        columns={columns}
        pagination={pagination}
      />
    );
  }

  fetchOAuthList() {
    return this.props.fetchOAuthList()
      .catch(error => Antd.message.error(error.message))
  }

  render() {
    return (
      <div>
        {this.renderEditModal()}
        {this.renderFilter()}
        {this.renderTable()}
      </div>
    );
  }
};

export default connect(
  ({OAuth}) => ({OAuth}),
  { fetchOAuthList, setOAuthPage, setOAuthKeyword, deleteOAuth }
)(OAuth);