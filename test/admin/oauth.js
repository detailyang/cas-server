/**
 * @Author: BingWu Yang (https://github.com/detailyang) <detailyang>
 * @Date:   2016-04-30T18:55:11+08:00
 * @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-05-06T23:15:52+08:00
 * @License: The MIT License (MIT)
*/


const supertest = require('supertest');
const app = require('../../');
const expect = require('chai').expect;
const agent = require('supertest-as-promised').agent(app.listen());


describe('admin oauth', () => {
  before(loginUser(agent));
  it('get admin oauth should be ok', (done) => {
    agent
    .get('/admin/oauths')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(0);
      expect(json.msg).to.equal('ok');
      expect(json.data.value[0].id).to.equal(1);
      expect(json.data.value[0].name).to.equal('test');
      expect(json.data.value[0].secret).to.equal('a067b5ce-48b6-4494-ae2e-9613ff3eb238');
      expect(json.data.value[0].identify).to.equal('ea10ae8d-7b43-4e32-9c71-3f0448842147');
      return done();
    });
  });

  it('post admin oauth should be ok', (done) => {
    agent
    .post('/admin/oauths')
    .send({
      name: 'abcde',
      desc: '123456',
    })
    .expect(200)
    .then((res) => {
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(0);
      expect(json.msg).to.equal('ok');
      return agent.get('/admin/oauths/2');
    })
    .then((res) => {
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(0);
      expect(json.msg).to.equal('ok');
      expect(json.data.value.name).to.equal('abcde');
      expect(json.data.value.desc).to.equal('123456');
      return agent.put('/admin/oauths/2')
                  .send({ desc: '654321' })
                  .expect(200);
    })
    .then((res) => {
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(0);
      expect(json.msg).to.equal('ok');
      return agent.delete('/admin/oauths/2')
                  .expect(200);
    })
    .then((res) => {
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(0);
      expect(json.msg).to.equal('ok');
      done();
    })
    .catch((err) => {
      done(err);
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
