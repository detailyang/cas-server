/*
* @Author: detailyang
* @Date:   2015-02-19 14:09:05
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-07 21:14:24
*/

'use strict';

var config = module.exports;

config['paginator'] = {
    per_page: 30
};

if (process.env.NODE_ENV === 'dev') {
    config['database'] = {
        'username': 'root',
        'password': '123456',
        'database': 'cas',
        'host': '127.0.0.1',
        'port': '3306',
        'dialect': 'mysql',
        'logging': false
    };
    config['redis'] = {
        'host': '127.0.0.1',
        'port': '6379',
        'ttl': 3600,
        'db': 0,
        'key': 'momtellmewhy'
    };
    config['password'] = {
        'default': process.env.CAS_PASSWORD_DEFAULT || 'password',
    }
} else if (process.env.NODE_ENV === 'test'){
} else {

}
