/*
 * @Author: detailyang
 * @Date:   2016-02-17 15:18:34
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T21:45:21+08:00
 */

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import config from './config';

import middlewares from './middlewares';
import routes from './routes';

const app = new Koa();

app.use(middlewares.log);
app.use(middlewares.error);
app.use(middlewares.return);
app.use(middlewares.session);
if (process.env.NODE_ENV === 'dev') {
  app.use(middlewares.webpack);
} else {
  app.use(middlewares.serve);
}
// use acl
app.use(middlewares.acl);
app.use(bodyParser());
app.use(middlewares.page);
app.use(middlewares.view);
app.use(middlewares.index);
app.use(middlewares.queue);
app.use(middlewares.cache);

app.use(routes.admin.user.routes());
app.use(routes.admin.oauth.routes());
app.use(routes.oauth.user.routes());
app.use(routes.api.user.routes());
app.use(routes.public.user.routes());
app.use(routes.public.oauth.routes());

app.listen(config.cas.port, () => {
  console.log(`server listen ${config.cas.port}`);
});
