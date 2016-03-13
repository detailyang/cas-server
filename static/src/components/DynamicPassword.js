/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-11T12:16:28+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T16:55:05+08:00
* @License: The MIT License (MIT)
*/


import {
  Button,
  Form,
  Input,
  Alert,
  Row,
  Col,
  Modal,
} from 'antd';
import React from 'react';
import QRCode from 'qrcode.react';

const FormItem = Form.Item;
const noop = () => {};

export default Form.create()(React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    form: React.PropTypes.object,
    onSubmit: React.PropTypes.func,
  },

  defaultProps: {
    form: {},
    onSubmit: noop,
  },

  getDefaultProps() {
    return { value: '', onSubmit: noop };
  },

  getInitialState() {
    return { loading: false, visible: false };
  },

  hideModal() {
    this.setState({ visible: false });
  },

  showModal() {
    this.setState({ visible: true });
  },

  handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  },

  handleCancel() {
    this.setState({ visible: false });
  },

  handleSubmit(value) {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      this.props.onSubmit(values.pass);
    });
  },

  render() {
    const { getFieldProps } = this.props.form;
    const passProps = getFieldProps('pass', {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '请填写动态密码',
        }, {
          validator: this.checkPass,
        },
      ],
    });
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 18,
      },
    };
    const style = {
      'margin': '10px',
    };
    let otpsecret = this.props.value.split('secret=');
    if (otpsecret.length !== 2) {
      otpsecret = this.props.value;
    } else {
      otpsecret = otpsecret[1];
    }

    return (
      <div style={style}>
        <Button type="primary" onClick={this.showModal}>动态密码</Button>
        <Modal
          title="动态密码"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
        >
          <Form horizontal form={this.props.form}>
            <Row>
              <div className="qrcode row-flex row-flex-center">
                <QRCode value={this.props.value} />
              </div>
              <div className="text-center">
                <Alert message="使用Google Authorization扫描二维码或者手动输入secret并校验" type="info" />
              </div>
              <Col span="18">
                <FormItem {...formItemLayout} label="secret:">
                  <Input
                    disabled
                    type="text"
                    value={otpsecret}
                  />
                </FormItem>
                <FormItem {...formItemLayout} label="动态密码：">
                  <Input
                    {...passProps}
                    type="text"
                    onContextMenu={noop}
                    onPaste={noop}
                    onCopy={noop}
                    onCut={noop}
                    autoComplete="off"
                    id="pass"
                  />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}));
