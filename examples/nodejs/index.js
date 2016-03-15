/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-15T13:39:31+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-15T14:10:58+08:00
* @License: The MIT License (MIT)
*/


const express = require('express');
const app = express();
const request = require('superagent');
const cas = {
  name: 'demo',
  token: '977beed4-ab6f-4e1f-b60c-9d84c60e1d5a',
  identify: '24a03e6e-d1ad-4f11-bd02-566b06b39481',
};

app.get('/', (req, res) => {
  res.redirect(`https://cas.qima-inc.com/public/oauth/authorize?name=${cas.name}`);
});

app.get('/cas/oauth/callback', (req, res) => {
  const code = req.query.code;
  request
  .get(`https://cas.qima-inc.com/oauth/users/self?code=${code}`)
  .set('authorization', `oauth ${cas.token}`)
  .end((err, r) => {
    if (err) return res.send('2333333333333333333333');
    if (r.body.code !== 0) {
      return res.send(r.body.data.value);
    }
    res.send(`hello, big brother: ${r.body.data.value.username}`);
  });
});

app.post('/cas/oauth/callback', (req, res) => {
  const authorization = req.headers.authorization;
  // you must check the authorization code , and it should such as `oauth ${cas.identify}`
  if (authorization.split(' ') !== 2) {
    return res.send('authorization format should such as oauth $identify');
  }

  const identify = authorization.split(' ')[1];
  if (identify !== cas.identify) {
    return res.send('fuck you');
  }

  // TODO maybe i will add some event
  const data = req.body;
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
