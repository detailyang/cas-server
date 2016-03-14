/*
 * @Author: detailyang
 * @Date:   2016-03-10 12:52:31
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T15:58:21+08:00
 */


const avatar = require('avatar-generator')();

module.exports = {
  generate(id, sex, width) {
    return new Promise((resolve, reject) => {
      avatar(id, sex, width).toBuffer((err, buffer) => {
        if (err) return reject(err);
        resolve(buffer);
      });
    });
  },
};
