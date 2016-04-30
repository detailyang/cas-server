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
const agent = supertest.agent(app.listen());


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
