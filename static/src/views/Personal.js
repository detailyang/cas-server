import React from 'react';
import _ from 'underscore';
import {
  message,
} from 'antd';

import Personal from '../components/Personal';
import PersonalModel from '../models/Personal';


export default React.createClass({
  getInitialState() {
    this.model = new PersonalModel();

    return _.extend({
      id: 0,
    }, this.model.toJSON());
  },

  handleUpload(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功。`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败。`);
    }
  },

  renderInfo() {
    const onOk = () => {
      this.model.fetch();
    };

    return (
      <Personal onOk={onOk}
        onUpload={this.handleUpload}
        upload={this.model.upload_url}
      />
    );
  },

  render() {
    return (
      <div>
        {this.renderInfo()}
      </div>
    );
  },
});
