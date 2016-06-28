/*
 * @Author: detailyang
 * @Date:   2016-02-18 12:43:02
* @Last modified by:   detailyang
* @Last modified time: 2016-06-24T13:55:10+08:00
 */
import koarouter from 'koa-router';
import controllers from '../../controllers';


const router = koarouter({
  prefix: '/api/pkis',
});
module.exports = router;

router.get('/ca', controllers.pki.ca.get);
router.post('/client', controllers.pki.client.post);
router.post('/server', controllers.pki.server.post);
