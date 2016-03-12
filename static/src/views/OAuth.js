import _ from 'underscore';
import React from 'react';
import Antd, { Table, Button, Input, Icon, Popconfirm } from 'antd';

import OauthEditModal from '../components/OauthEditModal';
import ModelMixin from '../mixins/model';
import OauthModel from '../models/Oauth';


const InputGroup = Input.Group;

export default React.createClass({

  mixins: [ModelMixin],

  getInitialState() {
    this.model = new OauthModel();

    return _.extend({
      editModalVisible: false,
      editModalId: 0,
    }, this.model.toJSON());
  },

  handleCreateClick() {
    this.setState({ editModalVisible: true, editModalId: 0 });
  },

  handleEditClick(record) {
    this.setState({ editModalVisible: true, editModalId: record.id });
  },

  handleDeleteClick(record) {
    this.model.delete(record.id).done(() => {
      Antd.message.success('删除成功');
      this.model.fetch();
    }).fail(() => {
      Antd.message.error('删除失败');
    });
  },
  handleKeywordChange(e) {
    const keyword = e.target.value;
    this.setState({ keyword });
  },

  handleKeywordKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleSearchClick();
    }
  },

  handleSearchClick() {
    this.setState({ loading: true });
    this.model.set({
      status: this.state.status,
      field: this.state.field,
      keyword: this.state.keyword,
      page: 1,
    }).fetch();
  },

  handleTableChange(pagination, filters) {
    this.setState({ loading: true });
    this.model.set({
      page: pagination.current,
      is_delete: filters.is_delete,
      keyword: this.state.keyword || '',
    }).fetch();
  },

  renderEditModal() {
    const _this = this;
    if (!this.state.editModalVisible) {
      return '';
    }

    const handleOk = () => {
      _this.setState({ editModalVisible: false });
      _this.model.fetch();
    };

    const handleCancel = () => {
      _this.setState({ editModalVisible: false });
    };

    return (
      <OauthEditModal
        id={this.state.editModalId}
        visible={this.state.editModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />);
  },

  renderFilter() {
    return (
      <div style={{ marginBottom: '10px' }}>
        <Button type="primary" onClick={this.handleCreateClick}>
          <Icon type="plus" />新建
        </Button>
        <div style={{ float: 'right' }}>
          <InputGroup className="ant-search-input" sytle={{ float: 'left' }} size="large">
            <Input
              defaultValue={this.state.keyword}
              onChange={this.handleKeywordChange}
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
  },

  renderTable() {
    const _this = this;
    const model = this.model;
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
        title: '操作',
        dataIndex: 'x',
        key: 'x',
        className: 'text-rigth',
        render(value, record) {
          return (
            <div>
              <Button
                type="ghost"
                size="small"
                onClick={_this.handleEditClick.bind(_this, record)}
              >编辑</Button>
              <Popconfirm
                placement="left"
                title="确认删除？"
                onConfirm={_this.handleDeleteClick.bind(_this, record)}
              >
                <Button type="ghost" size="small">删除</Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
    const pagination = {
      total: model.get('total'),
      current: model.get('page'),
      pageSize: model.get('per_page'),
      showTotal: (total) => `共 ${total} 条`,
      onChange: (page) => {
        this.setState({ loading: true });
        model.set('page', page).fetch();
      },
    };
    return (
      <Table
        dataSource={this.state.value}
        loading={this.state.loading}
        columns={columns}
        pagination={pagination}
        onChange={this.handleTableChange}
      />);
  },

  render() {
    return (
      <div>
        {this.renderEditModal()}
        {this.renderFilter()}
        {this.renderTable()}
      </div>
    );
  },
});
