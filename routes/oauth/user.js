/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T02:07:46+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T20:15:53+08:00
* @License: The MIT License (MIT)
*/


import koarouter from 'koa-router';

import controllers from '../../controllers';

const router = koarouter({
  prefix: '/oauth/users',
});
module.exports = router;

const onlyAdmin = async (ctx, next) => {
  console.log(ctx.oauth);
  await next();
};

router.get('/', onlyAdmin, controllers.user.detail.filter);
router.post('/', onlyAdmin, controllers.user.list.post);
router.get('/one', onlyAdmin, controllers.user.detail.getOne);
router.get('/self', onlyAdmin, controllers.oauth.detail.oauth.getUser);
router.post('/dynamicpassword', onlyAdmin, controllers.user.detail.dynamicpassword.post);

router.post('/login', controllers.user.detail.login);
router.post('/logout', controllers.user.detail.logout);
