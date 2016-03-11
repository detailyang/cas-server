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
    getDefaultProps() {
        return {value: '', onSubmit: noop};
    },

    getInitialState() {
        return {loading: false, visible: false};
    },

    hideModal() {
        this.setState({visible: false});
    },

    showModal() {
        this.setState({visible: true});
    },

    handleOk() {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false, visible: false});
        }, 3000);
    },

    handleCancel() {
        this.setState({visible: false});
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
        const {getFieldProps} = this.props.form;
        const passProps = getFieldProps('pass', {
            rules: [
                {
                    required: true,
                    whitespace: true,
                    message: '请填写密码'
                }, {
                    validator: this.checkPass
                }
            ]
        });
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            }
        };
        const style = {
            'margin': '10px'
        }

        return (
            <div style={style}>
                <Button type="primary" onClick={this.showModal}>动态密码</Button>
                <Modal title="动态密码" visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.hideModal}>
                    <Form horizontal form={this.props.form}>
                        <Row>
                            <div className="qrcode row-flex row-flex-center">
                                <QRCode value={this.props.value}/>
                            </div>
                            <div className="text-center">
                                <Alert message="使用Google Authorization扫描二维码并校验" type="info"/>
                            </div>
                            <Col span="18">
                                <FormItem {...formItemLayout} label="动态密码：">
                                    <Input {...passProps} type="text" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off" id="pass"/>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        );
    }
}));
