/*
 * @Author: detailyang
 * @Date:   2016-03-07 19:59:56
* @Last modified by:   detailyang
* @Last modified time: 2016-04-30T21:07:11+08:00
 */

 /**
 * @Author: BingWu Yang (https://github.com/detailyang) <detailyang>
 * @Date:   2016-04-30T18:55:11+08:00
 * @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-30T21:07:11+08:00
 * @License: The MIT License (MIT)
 */


const supertest = require('supertest');
const app = require('../../');
const expect = require('chai').expect;
const request = () => supertest(app.listen());

describe('/admin/users', () => {
  it('should get admin users', (done) => {
    request()
    .get('/admin/users')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      console.log(res.text);
      expect(json.code).to.equal(40004);
      expect(json.msg).to.equal('not found');
      expect(json.data.value).to.equal('dont find user');
      return done();
    });
  });
});
