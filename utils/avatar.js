/*
* @Author: detailyang
* @Date:   2016-03-10 12:52:31
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-10 13:02:19
*/

'use strict';
var avatar = require('avatar-generator')();

module.exports = {
    generate(id, sex, width) {
        return new Promise((resolve, reject)=> {
            avatar(id, sex, width).toBuffer(function (err,buffer){
                if (err) return reject(err);
                resolve(buffer);
            });
        });
    }
}