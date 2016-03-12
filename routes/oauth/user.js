/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T02:07:46+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T03:39:28+08:00
* @License: The MIT License (MIT)
*/


import koarouter from 'koa-router';

import controllers from '../../controllers';

const router = koarouter({
  prefix: '/oauth/users',
});
module.exports = router;

router.post('/login', controllers.user.detail.login);
router.post('/logout', controllers.user.detail.logout);
