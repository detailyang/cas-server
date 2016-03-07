/*
* @Author: detailyang
* @Date:   2016-02-18 19:34:42
* @Last Modified by:   detailyang
* @Last Modified time: 2016-02-29 10:32:59
*/

'use strict';
var validator = require('validator');

module.exports = {
    isAlphaNumber: (value) => {
        if (!validator.isAlphanumeric(value)) {
            throw new Error(`必须为大小写数字或者字母.`);
        }
    },
    isEmail: (value) => {
        console.log(value);
        if (!validator.isEmail(value)) {
            throw new Error(`必须为邮箱格式.`);
        }
    }
}