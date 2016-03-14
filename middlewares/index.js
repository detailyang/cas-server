/*
 * @Author: detailyang
 * @Date:   2016-03-08 11:48:24
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T15:45:18+08:00
 */


import co from 'co';

import session from './session';
import ret from './ret';
import log from './log';
import page from './page';
import err from './err';
import view from './view';
import webpack from './webpack';
import acl from './acl';
import queue from './queue';
import cache from './cache';
import serve from './serve';


module.exports = {
  'session': session,
  'return': ret,
  'log': log,
  'page': page,
  'error': err,
  'view': view,
  'webpack': webpack,
  'acl': acl,
  'queue': queue,
  'cache': cache,
  'serve': serve,
  'index': async(ctx, next) => {
    ctx.render = co.wrap(ctx.render.bind(ctx));
    if (ctx.request.path === '/') {
      await ctx.render('index.html');
    }
    await next();
  },
};
