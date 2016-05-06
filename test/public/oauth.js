/*
* @Author: detailyang
* @Date:   2016-05-01 19:23:33
* @Last modified by:   detailyang
* @Last modified time: 2016-05-06T23:25:25+08:00
*/

'use strict';


const supertest = require('supertest');
const app = require('../../');
const expect = require('chai').expect;
const agent = require("supertest-as-promised").agent(app.listen());
const request = () => supertest(app.listen());


describe('/public/oauth', function() {
  before(loginUser(agent));
  it('authorized user should be ok', (done) => {
    agent
    .get('/public/oauth?name=test')
    .expect(302)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.header.location).to.equal('/public/oauth/authorize?name=test');
      done();
    });
  });
  it('unauthorized user should should be ok', (done) => {
    request()
    .get('/public/oauth?name=test')
    .expect(200);
    done();
  });
  it('unauthorized oauth should be ok', (done) => {
    agent
    .get('/public/oauth/authorize?name=abcdefjgk')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(40004);
      expect(json.msg).to.equal('not found');
      done();
    })
  });
  it('authorized oauth should be ok', (done) => {
    agent
    .post('/public/oauth/authorize?name=test')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(0);
      expect(json.msg).to.equal('ok');
      expect(json.data.value).to.match(/http:\/\/test\.com\/callback\?code=.*/)
      done();
    })
  });
  it('authorized oauth onetime should be ok', (done) => {
    agent
    .post('/public/oauth/onetime?name=test')
    .send({
      username: 'admin',
      password: 'password'
    })
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      done();
    });
  });
});

function loginUser(agent) {
  return (done) => {
    agent
    .post('/public/users/login')
    .send({ username: 'admin', password: 'password' })
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
  });
};
}
