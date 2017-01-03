/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T22:06:56+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-06-24T13:18:09+08:00
* @License: The MIT License (MIT)
*/


import config from '../../config';


module.exports = {
  async get(ctx) {
    console.log(config.pki.ca);
    ctx.body = 'abcd';
  },
};
