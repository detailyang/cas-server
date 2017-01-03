/**
* @Author: BingWu Yang (https://github.com/detailyang) <detailyang>
* @Date:   2016-04-30T18:55:11+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-05-07T00:34:19+08:00
* @License: The MIT License (MIT)
*/


const supertest = require('supertest');
const app = require('../../');
const expect = require('chai').expect;
const request = () => supertest(app.listen());


// router.post('/', adminOnly, controllers.user.list.post);
// router.post('/dynamicpassword', adminOnly, controllers.user.detail.dynamicpassword.post);
//
// router.post('/logout', controllers.user.detail.logout);

describe('oauth user', () => {
  it('oauth user should be ok', (done) => {
    request()
    .get('/oauth/users')
    .set('authorization', 'oauth a067b5ce-48b6-4494-ae2e-9613ff3eb238')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(0);
      expect(json.msg).to.equal('ok');
      done();
    });
  });
  it('oauth user one should be ok', (done) => {
    request()
    .get('/oauth/users/one?field=username&value=admin')
    .set('authorization', 'oauth a067b5ce-48b6-4494-ae2e-9613ff3eb238')
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
  it('oauth user self should be ok', (done) => {
    request()
    .get('/oauth/users/self?code=123123')
    .set('authorization', 'oauth a067b5ce-48b6-4494-ae2e-9613ff3eb238')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(40004);
      expect(json.msg).to.equal('not found');
      return done();
    });
  });
  it('oauth avatar should be ok', (done) => {
    request()
    .put('/oauth/users/avatar')
    .attach('avatar', 'test/resources/avatar.jpg')
    .field('username', 'admin')
    .set('authorization', 'oauth a067b5ce-48b6-4494-ae2e-9613ff3eb238')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(0);
      expect(json.msg).to.equal('ok');
      return done();
    });
  });
  it('oauth username shoulde be ok', (done) => {
    request()
    .get('/oauth/users/admin')
    .set('authorization', 'oauth a067b5ce-48b6-4494-ae2e-9613ff3eb238')
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
  it('oauth username update shoulde be ok', (done) => {
    request()
    .put('/oauth/users/admin')
    .set('authorization', 'oauth a067b5ce-48b6-4494-ae2e-9613ff3eb238')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(0);
      expect(json.msg).to.equal('ok');
      return done();
    });
  });
  it('oauth username login shoulde be ok', (done) => {
    request()
    .post('/oauth/users/login')
    .send({
      username: 'admin',
      password: 'password',
    })
    .set('authorization', 'oauth a067b5ce-48b6-4494-ae2e-9613ff3eb238')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(0);
      expect(json.msg).to.equal('ok');
      return done();
    });
  });
  it('oauth username logout shoulde be ok', (done) => {
    request()
    .post('/oauth/users/logout')
    .set('authorization', 'oauth a067b5ce-48b6-4494-ae2e-9613ff3eb238')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      const text = res.text;
      const json = JSON.parse(text);
      expect(json.code).to.equal(0);
      expect(json.msg).to.equal('ok');
      return done();
    });
  });
});
