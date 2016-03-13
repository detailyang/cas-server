/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T02:07:46+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T20:36:29+08:00
* @License: The MIT License (MIT)
*/


import koarouter from 'koa-router';

import controllers from '../../controllers';

const router = koarouter({
  prefix: '/oauth/users',
});
module.exports = router;

router.get('/', controllers.user.detail.filter);
router.post('/', controllers.user.list.post);
router.get('/one', controllers.user.detail.getOne);
router.post('/login', controllers.user.detail.login);
router.post('/logout', controllers.user.detail.logout);
router.post('/dynamicpassword', controllers.user.detail.dynamicpassword.post);
