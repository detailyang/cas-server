import Antd from 'antd';

const handleEditModalOk = function () {
  this.model.set(this.state.formData);
  this.setState({
    confirmLoading: true,
  });

  this.model.save()
    .always(() => {
      this.setState({
        confirmLoading: false,
      });
    })
    .done(() => {
      const msg = this.model.get('id') ? '编辑成功' : '创建成功';
      Antd.message.success(msg);
      this.props.onOk();
    })
    .fail((msg, resp) => {
      if (resp.data && resp.data.errors) {
        this.setState({
          formErrors: resp.data.errors,
        });
      }
      Antd.message.error(msg, 3);
    });
};

const handleEditModalCancel = function () {
  this.props.onCancel();
};

export default {
  'handleEditModalOk': handleEditModalOk,
  'handleEditModalCancel': handleEditModalCancel,
};
