import _ from 'underscore'

let clearError = function(field) {
    let formErrors = this.state.formErrors
    if (formErrors[field]) {
        delete formErrors[field]
        this.setState({formErrors})
    }
}

let setValue = function(field, e) {
    var v = e;
    var target = e && e.target;
    if (target) {
        if (target.type === 'checkbox') {
            v = target.checked;
        } else {
            v = e.target.value;
        }
    }
    var newFormData = {};
    newFormData[field] = v;
    this.setState({
        formData: _.extend(this.state.formData, newFormData)
    });

    let formErrors = this.state.formErrors
    if (formErrors && formErrors[field]) {
        delete formErrors[field]
        this.setState({formErrors})
    }
}

export default {
    setValue: setValue,
    clearError: clearError
}
