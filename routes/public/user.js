/*
 * @Author: detailyang
 * @Date:   2016-02-29 14:32:13
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T20:33:51+08:00
 */
import koarouter from 'koa-router';

import controllers from '../../controllers';


const router = koarouter({
  prefix: '/public/users',
});
module.exports = router;

router.get('/avatar/:username(.+)', controllers.user.detail.avatar.getByUsername);
router.post('/login', controllers.user.detail.login);
router.post('/logout', controllers.user.detail.logout);
