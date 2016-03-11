import _ from 'underscore';

const clearError = function (field) {
  const formErrors = this.state.formErrors;
  if (formErrors[field]) {
    delete formErrors[field];
    this.setState({ formErrors });
  }
};

const setValue = function (field, e) {
  let v = e;
  const target = e && e.target;
  if (target) {
    if (target.type === 'checkbox') {
      v = target.checked;
    } else {
      v = e.target.value;
    }
  }
  const newFormData = {};
  newFormData[field] = v;
  this.setState({
    formData: _.extend(this.state.formData, newFormData),
  });

  const formErrors = this.state.formErrors;
  if (formErrors && formErrors[field]) {
    delete formErrors[field];
    this.setState({ formErrors });
  }
};

export default {
  'setValue': setValue,
  'clearError': clearError,
};
