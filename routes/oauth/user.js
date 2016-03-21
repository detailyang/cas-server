/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T02:07:46+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-21T17:22:53+08:00
* @License: The MIT License (MIT)
*/


import koarouter from 'koa-router';
import utils from '../../utils';

import controllers from '../../controllers';


const router = koarouter({
  prefix: '/oauth/users',
});
module.exports = router;

const adminOnly = async (ctx, next) => {
  if (!ctx.oauth.is_admin) {
    throw new utils.error.PermissionError('you are not admin');
  }
  await next();
};

router.post('/', adminOnly, controllers.user.list.post);
router.put('/:username(.+)', adminOnly, controllers.user.detail.updateByUsername);
router.post('/dynamicpassword', adminOnly, controllers.user.detail.dynamicpassword.post);

router.get('/one', controllers.user.detail.getOne);
router.get('/:username(.+)', controllers.user.detail.getByUsername);
router.get('/', controllers.user.list.get);
router.get('/self', controllers.oauth.detail.oauth.getUser);
router.post('/login', controllers.user.detail.login);
router.post('/logout', controllers.user.detail.logout);
