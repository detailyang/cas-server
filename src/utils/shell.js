/**
* @Author: BingWu Yang (https://github.com/detailyang) <detailyang>
* @Date:   2016-06-24T13:40:55+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-06-28T11:41:37+08:00
* @License: The MIT License (MIT)
*/


import shelljs from 'shelljs';


const exec = shelljs.exec;
const pushd = shelljs.pushd;
const popd = shelljs.popd;


module.exports = {
  exec: (cmd) => {
    return new Promise((resolve, reject) => {
      exec(cmd, { silent: true }, (code, stdout, stderr) => {
        if (code) {
          console.log(code, stdout, stderr);
          return reject(new Error({code, stdout, stderr }));
        }
        return resolve({ stdout, stderr, code });
      });
    });
  },
  execSync: (cmd) => {
    return exec(cmd, { silent: true });
  },
  pushdSync: (dir) => {
    return pushd(dir);
  },
  popdSync: (dir) => {
    return popd(dir);
  }
};
