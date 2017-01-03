/*
 * @Author: detailyang
 * @Date:   2016-03-07 19:59:56
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T03:19:19+08:00
 */
import koarouter from 'koa-router';
import controllers from '../../controllers';

const router = koarouter({
  prefix: '/admin/users',
});
module.exports = router;

router.get('/', controllers.user.list.get);
router.post('/', controllers.user.list.post);
router.get('/:id(\\d+)', controllers.user.list.id.get);
router.delete('/:id(\\d+)', controllers.user.list.id.delete);
router.put('/:id(\\d+)', controllers.user.list.id.put);
router.put('/:id(\\d+)/staticpassword', controllers.user.list.id.staticpassword.put);
