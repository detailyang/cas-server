/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-14T10:30:11+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-16T13:13:29+08:00
* @License: The MIT License (MIT)
*/


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
