/*
 * @Author: detailyang
 * @Date:   2016-02-29 10:18:29
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T03:24:23+08:00
 */
import koarouter from 'koa-router';
import controllers from '../../controllers';


const router = koarouter({
  prefix: '/admin/oauths',
});
module.exports = router;

router.get('/', controllers.oauth.list.get);
router.post('/', controllers.oauth.list.post);
router.delete('/', controllers.oauth.list.delete);
router.get('/:id(\\d+)', controllers.oauth.list.id.get);
router.put('/:id(\\d+)', controllers.oauth.list.id.put);
