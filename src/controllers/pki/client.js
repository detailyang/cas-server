/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T22:06:56+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-06-28T15:08:17+08:00
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
    const password = ctx.request.body.password || config.pki.password;
    const days = ctx.request.body.days || config.pki.days;
    const cn = `CN=${ctx.session.username}`;

    // Actually, CAS dont care work directory
    if (!cn) {
      throw new utils.error.ParamsError('commonname cannot be empty');
    }
    pushdSync(config.pki.dir);
    try {
      const key = await exec(`openssl genrsa -des3 -out ${cn}.key `
                           + `-passout pass:${password} 2048`);
      if (key.code) {
        throw new utils.error.ServerError('generate rsa error');
      }
      const csr = await exec(`openssl req -new -key ${cn}.key -out ${cn}.csr `
                           + `-passin pass:${password} -subj "${config.pki.subj}/${cn}"`);
      if (csr.code) {
        throw new utils.error.ServerError('req error');
      }

      pki = await models.pki.create({
        name: cn,
        uid: ctx.session.id,
      });
      if (!pki) {
        throw new utils.error.ServerError('create pki error');
      }

      const crt = await exec('openssl x509 -req -sha256 '
                            + `-days ${days} -passin pass:${config.pki.ca.passin} `
                            + `-in ${cn}.csr -CA ca.crt -CAkey ca.key -set_serial ${pki.id} `
                            + `-out ${cn}.crt`);
      if (crt.code) {
        throw new utils.error.ServerError('x509 error');
      }

      const pkcs12 = await exec('openssl pkcs12 -export -clcerts '
                              + `-passin pass:${password} -in ${cn}.crt -passout pass:${password} `
                              + `-inkey ${cn}.key -out ${cn}.p12`);
      if (pkcs12.code) {
        throw new utils.error.ServerError('pkcs12 error');
      }
    } catch (e) {
      throw new utils.error.ServerError(e.message);
    }

    console.log(pki.id);
    const rv = await models.pki.update({
      pkcs12: readFileSync(`${cn}.p12`).toString(),
      key: readFileSync(`${cn}.key`).toString(),
      csr: readFileSync(`${cn}.csr`).toString(),
      crt: readFileSync(`${cn}.crt`).toString(),
      is_delete: false,
    }, {
      where: {
        id: pki.id,
      },
    });
    if (!rv) {
      throw new utils.error.ServerError('update pki error');
    }
    console.log(readFileSync(`${cn}.p12`));

    // ignore whether we popd right or not right
    popdSync();
    ctx.body = ctx.return;
  },
};
