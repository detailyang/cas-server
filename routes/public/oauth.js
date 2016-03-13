/*
 * @Author: detailyang
 * @Date:   2016-02-29 14:32:13
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T23:44:12+08:00
 */
import koarouter from 'koa-router';

import controllers from '../../controllers';


const router = koarouter({
  prefix: '/public/oauth',
});
module.exports = router;

router.get('/', controllers.oauth.detail.oauth);
router.get('/authorize', controllers.oauth.detail.authorize.get);
router.post('/authorize', controllers.oauth.detail.authorize.post);
