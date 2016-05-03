/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-11T12:16:28+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-21T00:43:04+08:00
* @License: The MIT License (MIT)
*/


import Antd, {
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
import { fetch } from '../utils';

const FormItem = Form.Item;
const noop = () => {};

export default Form.create()(React.createClass({
  propTypes: {
    form: React.PropTypes.object,
    onSubmit: React.PropTypes.func,
  },

  getDefaultProps() {
    return { value: '', onSubmit: noop };
  },

  getInitialState() {
    return { loading: false, visible: false, qrcodeValue: '' };
  },

  hideModal() {
    this.setState({ visible: false });
  },

  showModal() {
    fetch('/api/users/self/dynamicpassword')
      .then(data => {
        this.setState({ qrcodeValue: data.value.notp })
      })
      .catch(error => Antd.message.error(error.message));
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

  handleSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      this.props.onSubmit(values.pass);
    });
  },

  handleCopy(e) {
    e.preventDefault();
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
    const { qrcodeValue } = this.state;
    let otpsecret = qrcodeValue.split('secret=');
    if (otpsecret.length !== 2) {
      otpsecret = qrcodeValue;
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
              <div className="qrcode">
                <QRCode value={qrcodeValue} />
              </div>
              <div className="text-center">
                <Alert message="使用Google Authorization扫描二维码或者手动输入secret并校验" type="info" />
              </div>
              <Col span="18">
                <FormItem {...formItemLayout} label="secret:">
                  <Row>
                    <Col span="24">
                      <Input
                        disabled
                        type="text"
                        value={otpsecret}
                        onClick={this.handleCopy}
                      />
                    </Col>
                  </Row>
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
  },
}));
