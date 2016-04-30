/**
* @Author: BingWu Yang (https://github.com/detailyang) <detailyang>
* @Date:   2016-04-30T18:55:11+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-30T20:12:06+08:00
* @License: The MIT License (MIT)
*/


const supertest = require('supertest');
const app = require('../../');
const expect = require('chai').expect;
const request = () => supertest(app.listen());

describe('/avatar/:username(.+)', () => {
  it('should not get abcdefghijk key', (done) => {
    request()
    .get('/public/users/key/abcdefghijk')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(40004);
      expect(json.msg).to.equal('not found');
      expect(json.data.value).to.equal('dont find user');
      return done();
    });
  });
});
