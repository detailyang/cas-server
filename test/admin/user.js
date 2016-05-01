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
const agent = require("supertest-as-promised").agent(app.listen());


describe('admin', function() {
  before(loginUser(agent));
  it('get admin users should be ok', (done) => {
    agent
    .get('/admin/users')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(0);
      expect(json.msg).to.equal('ok');
      expect(json.data.value[0].id).to.equal(1);
      expect(json.data.value[0].username).to.equal('admin');
      return done();
    });
  });
  it('get admin user shoule be ok', (done) => {
    agent
    .get('/admin/users/1')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(0);
      expect(json.msg).to.equal('ok');
      expect(json.data.value.id).to.equal(1);
      expect(json.data.value.username).to.equal('admin');
      return done();
    });
  });
  describe('admin CRUD user', () => {
    let id = 0;
    it('CRUD user should be ok', (done) => {
      agent
      .post('/admin/users')
      .send({
        username:"test",
        realname:"test",
        aliasname:"test",
        email: "test@example.com",
        mobile:"0123456789",
        gender:0,
        is_admin:0,
        is_delete:0
      })
      .expect(200)
      .then(function (res) {
        const text = res.text;
        const json = JSON.parse(text);
        id = json.data.value.id;
        expect(json.code).to.equal(0);
        expect(json.msg).to.equal('ok');
        expect(json.data.value.id).to.be.a('number');
        return agent.delete(`/admin/users/${json.data.value.id}`)
                    .expect(200)
      })
      .then((res) => {
        const text = res.text;
        const json = JSON.parse(text);
        expect(json.code).to.equal(0);
        expect(json.msg).to.equal('ok');
        return agent.get(`/admin/users/${id}`)
                    .expect(200)
      })
      .then((res) => {
        const text = res.text;
        const json = JSON.parse(text);
        expect(json.code).to.equal(0);
        expect(json.msg).to.equal('ok');
        expect(json.data.value.is_delete).to.equal(true);
        return agent.put(`/admin/users/${id}`)
                    .send({is_delete: 0})
                    .expect(200)
      })
      .then((res) => {
        const text = res.text;
        const json = JSON.parse(text);
        expect(json.code).to.equal(0);
        expect(json.msg).to.equal('ok');
        return agent.get(`/admin/users/${id}`)
                    .expect(200)
      })
      .then((res) => {
        const text = res.text;
        const json = JSON.parse(text);
        expect(json.code).to.equal(0);
        expect(json.msg).to.equal('ok');
        expect(json.data.value.is_delete).to.equal(false);
        done();
      })
      .catch((err) => {
        done(err);
      })
    });
    it('username shoule be unique', (done) => {
      agent
      .post('/admin/users')
      .send({
        username:"test",
        realname:"test",
        aliasname:"test",
        email: "test@example.com",
        mobile:"0123456789",
        gender:0,
        is_admin:0,
        is_delete:0
      })
      .end((err, res) => {
        if (err) done(err);
        const text = res.text;
        const json = JSON.parse(text);
        expect(json.code).to.equal(40001);
        expect(json.msg).to.equal('bad request');
        expect(json.data.errors.username).to.equal('username must be unique');
        done();
      })
    });
  })
})

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
