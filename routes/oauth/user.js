/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T02:07:46+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T02:46:07+08:00
* @License: The MIT License (MIT)
*/


import koarouter from 'koa-router';

import models from '../../models';
import config from '../../config';
import utils from '../../utils';

const router = koarouter({
  prefix: '/oauth/users',
});
module.exports = router;
