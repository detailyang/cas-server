import React from 'react'
import _ from 'underscore'
import {
    Form,
    Input,
    Button,
    message,
    Checkbox,
    Radio,
    Row,
    Col,
    Tooltip,
    Icon
} from 'antd'
import UserEditModal from '../components/UserEditModal'
import Personal from '../components/Personal'
import ModelMixin from '../mixins/model'
import PersonalModel from '../models/Personal'

export default React.createClass({
    getInitialState() {
        this.model = new PersonalModel()

        return _.extend({
            id: 0
        }, this.model.toJSON())
    },

    render() {
        return (
            <div>
                {this.renderInfo()}
            </div>
        )
    },

    renderInfo() {
        return <Personal onOk={() => {
            this.model.fetch();
        }} onUpload={this.handleUpload} upload={this.model.upload_url}/>
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
    }
})
