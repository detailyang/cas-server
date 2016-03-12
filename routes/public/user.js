/*
 * @Author: detailyang
 * @Date:   2016-02-29 14:32:13
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T02:49:17+08:00
 */
import controllers from '../../controllers';
import koarouter from 'koa-router';


const router = koarouter({
  prefix: '/public/users',
});
module.exports = router;

router.post('/login', controllers.user.detail.login);
router.post('/logout', controllers.user.detail.logout);
