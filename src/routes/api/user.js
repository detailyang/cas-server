/*
 * @Author: detailyang
 * @Date:   2016-02-18 12:43:02
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T02:59:43+08:00
 */
import koarouter from 'koa-router';
import convert from 'koa-convert';
import koaBody from 'koa-body';
import controllers from '../../controllers';


const koabody = koaBody({
  multipart: true,
});
const router = koarouter({
  prefix: '/api/users',
});
module.exports = router;

router.get('/self', controllers.user.detail.get);
router.put('/self', controllers.user.detail.put);
router.get('/self/avatar', controllers.user.detail.avatar.get);
router.post('/self/avatar', convert(koabody), controllers.user.detail.avatar.post);
router.post('/self/dynamicpassword', controllers.user.detail.dynamicpassword.post);
router.get('/self/dynamicpassword', controllers.user.detail.dynamicpassword.get);
router.put('/self/staticpassword', controllers.user.detail.staticpassword.put);
