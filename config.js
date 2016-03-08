/*
* @Author: detailyang
* @Date:   2015-02-19 14:09:05
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-08 11:08:02
*/

'use strict';

var config = module.exports;

config['paginator'] = {
    per_page: 30
};

if (process.env.NODE_ENV === 'dev') {
    config['database'] = {
        'username': 'cas',
        'password': 'showmemoney',
        'database': 'cas',
        'host': '192.168.66.202',
        'port': '3306',
        'dialect': 'mysql',
        'logging': false
    };
    config['redis'] = {
        'host': '192.168.66.202',
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
