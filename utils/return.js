/*
* @Author: detailyang
* @Date:   2016-02-18 16:09:11
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-10 11:46:38
*/

'use strict';

let _return = {
    success: {
        code: 0,
        msg: 'ok'
    },
    default: {
        code: 1,
        msg: 'hi jack'
    },
    'failure': {
        code: 40000,
        msg: 'bad request'
    },
    'unauthorized': {
        code: 40001,
        msg: 'wrong password'
    },
    'notfound': {
        code: 40004,
        msg: 'not found'
    },
    'servererror': {
        code: 50000,
        msg: 'server internal error'
    }
}

module.exports = {
    getCode: (name) => {
        if (_return[name]) {
            return _return[name]['code'];
        }

        return _return['default']['code'];
    },
    getMsg: (name) => {
        if (_return[name]) {
            return _return[name]['msg'];
        }

        return _return['default']['msg'];
    }
}
