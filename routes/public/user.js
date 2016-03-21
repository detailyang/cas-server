/*
 * @Author: detailyang
 * @Date:   2016-02-29 14:32:13
* @Last modified by:   detailyang
* @Last modified time: 2016-03-18T18:06:25+08:00
 */
import koarouter from 'koa-router';

import controllers from '../../controllers';


const router = koarouter({
  prefix: '/public/users',
});
module.exports = router;

router.get('/avatar/:username(.+)', controllers.user.detail.avatar.getByUsername);
router.get('/key/:username(.+)', controllers.user.detail.key.getByUsername);
router.post('/login', controllers.user.detail.login);
router.post('/logout', controllers.user.detail.logout);
