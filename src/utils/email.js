/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-17T14:37:21+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-17T15:39:59+08:00
* @License: The MIT License (MIT)
*/


const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const config = require('../config');
const transport = nodemailer.createTransport(smtpTransport({
  host: config.email.host,
  secure: +config.email.secure,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
}));

module.exports = {
  send: (subject, text, to) => {
    const mailOptions = {
      from: config.email.from,
      to: to,
      subject: subject,
      html: text,
    };

    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (error, response) => {
        if (error) return reject(error);
        return resolve(response);
      });
    });
  },
};
