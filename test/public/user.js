/**
* @Author: BingWu Yang (https://github.com/detailyang) <detailyang>
* @Date:   2016-04-30T18:55:11+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-30T21:00:57+08:00
* @License: The MIT License (MIT)
*/


const supertest = require('supertest');
const app = require('../../');
const expect = require('chai').expect;
const request = () => supertest(app.listen());

describe('/public/users/key/:username(.+)', () => {
  it('should do not get abcdefghijk key', (done) => {
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

describe('/public/users/login', () => {
  it('right password should ok', (done) => {
    request()
    .post('/public/users/login')
    .send({
      username: 'admin',
      password: 'password',
    })
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(0);
      expect(json.msg).to.equal('ok');
      expect(json.data.value.id).to.equal(1);
      expect(json.data.value.username).to.equal('admin');
      expect(json.data.value.realname).to.equal('admin');
      expect(json.data.value.aliasname).to.equal('admin');
      expect(json.data.value.is_admin).to.equal(true);

      return done();
    })
  })

  it('wrong password should ok', (done) => {
    request()
    .post('/public/users/login')
    .send({
      username: 'admin',
      password: 'asdfasdf',
    })
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(40000);
      expect(json.msg).to.equal('param not right');
      expect(json.data.value).to.equal('password not right');

      return done();
    })
  })
});


describe('/public/users/logout', () => {
  it('logout should ok', (done) => {
    request()
    .post('/public/users/logout')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(0);
      expect(json.msg).to.equal('ok');
      expect(json.data.value).to.equal(null);


      return done();
    })
  })
});