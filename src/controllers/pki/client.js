/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T22:06:56+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-06-24T14:55:40+08:00
* @License: The MIT License (MIT)
*/


import config from '../../config';

import models from '../../models';
import utils from '../../utils';
import { execSync } from '../../utils/shell';


module.exports = {
  async post(ctx) {
    const cn = ctx.request.body.commonname;
    const password = ctx.request.body.password || config.pki.password;
    const days = ctx.request.body.days || config.pki.days;

    /* private key*/
    // openssl genrsa -des3 -out server.key 4096
    // use user key
    const key = execSync(`openssl genrsa -des3 -out ${cn}.key -passout pass:${password} 2048`);
    console.log(key);

    ctx.body = 'abcd';
  },
};
