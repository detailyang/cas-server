/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T22:06:56+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-06-28T13:54:44+08:00
* @License: The MIT License (MIT)
*/


import config from '../../config';

import models from '../../models';
import utils from '../../utils';
import { pushdSync, popdSync, execSync, exec } from '../../utils/shell';


module.exports = {
  async post(ctx) {
    let cn = ctx.request.body.commonname;
    const password = ctx.request.body.password || config.pki.password;
    const days = ctx.request.body.days || config.pki.days;

    if (cn instanceof Array) {
      cn = cn.map((e) => `CN=${e}`).join('/');
    } else {
      cn = `CN=${cn}`;
    }
    const encodedcn= cn.replace('*', 'wildcard').replace('/', '-');

    // Actually, CAS dont care work directory
    if (!cn) {
      throw new utils.error.ParamsError('commonname cannot be empty');
    }
    pushdSync(config.pki.dir);
    try {
      const key = await exec(`openssl genrsa -des3 -out ${encodedcn}.key `
                           + `-passout pass:${password} 2048`);
      if (key.code) {
        throw new utils.error.ServerError('generate rsa error');
      }
      const csr = await exec(`openssl req -new -key ${encodedcn}.key -out ${encodedcn}.csr `
                           + `-passin pass:${password} -subj "${config.pki.subj}/${cn}"`);
      if (csr.code) {
        throw new utils.error.ServerError('req error');
      }
      const crt = await exec('openssl x509 -req -sha256 '
                            + `-days ${days} -passin pass:${config.pki.ca.passin} `
                            + `-in ${encodedcn}.csr -CA ca.crt -CAkey ca.key -set_serial 01 `
                            + `-out ${encodedcn}.crt`);
      if (crt.code) {
        throw new utils.error.ServerError('x509 error');
      }
    } catch (e) {
      throw new utils.error.ServerError(e.message);
    }
    popdSync();

    ctx.body = ctx.return;
  },
};
