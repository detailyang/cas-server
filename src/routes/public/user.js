/*
 * @Author: detailyang
 * @Date:   2016-02-29 14:32:13
* @Last modified by:   detailyang
* @Last modified time: 2016-06-14T14:28:47+08:00
 */
import koarouter from 'koa-router';

import controllers from '../../controllers';


const router = koarouter({
  prefix: '/public/users',
});
module.exports = router;

router.get('/avatar/:username(.+)', controllers.user.detail.avatar.getByUsername);
router.get('/key/:username(.+)', controllers.user.detail.key.getByUsername);
router.post('/ssh/login', controllers.user.detail.ssh.login);
router.post('/md5/login', controllers.user.detail.md5.login);
router.get('/login', controllers.user.detail.login);
router.post('/login', controllers.user.detail.login);
router.post('/logout', controllers.user.detail.logout);
