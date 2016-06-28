/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T22:06:56+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-06-28T14:59:18+08:00
* @License: The MIT License (MIT)
*/


import { readFileSync } from 'fs';


import config from '../../config';
import models from '../../models';
import utils from '../../utils';
import { pushdSync, popdSync, exec } from '../../utils/shell';


module.exports = {
  async post(ctx) {
    let pki = {
      id: 0,
    };
    let cn = ctx.request.body.commonname;
    const password = ctx.request.body.password || config.pki.password;
    const days = ctx.request.body.days || config.pki.days;

    if (cn instanceof Array) {
      cn = cn.map((e) => `CN=${e}`).join('/');
    } else {
      cn = `CN=${cn}`;
    }
    const encodedcn = cn.replace('*', 'wildcard').replace('/', '-');

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

      pki = await models.pki.create({
        name: encodedcn,
      });
      if (!pki) {
        throw new utils.error.ServerError('create pki error');
      }

      const crt = await exec('openssl x509 -req -sha256 '
                            + `-days ${days} -passin pass:${config.pki.ca.passin} `
                            + `-in ${encodedcn}.csr -CA ca.crt -CAkey ca.key -set_serial ${pki.id} `
                            + `-out ${encodedcn}.crt`);
      if (crt.code) {
        throw new utils.error.ServerError('x509 error');
      }
    } catch (e) {
      throw new utils.error.ServerError(e.message);
    }

    const rv = await models.pki.update({
      key: readFileSync(`${encodedcn}.key`),
      csr: readFileSync(`${encodedcn}.csr`),
      crt: readFileSync(`${encodedcn}.crt`),
      is_delete: false,
    }, {
      where: {
        id: pki.id,
      },
    });
    if (!rv) {
      throw new utils.error.ServerError('update pki error');
    }

    // ignore whether we popd right or not right
    popdSync();
    ctx.body = ctx.return;
  },
};
