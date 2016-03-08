/*
 * @Author: detailyang
 * @Date:   2016-02-17 15:18:34
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-08 14:54:42
 */

import koa from "koa";
import bodyParser from "koa-bodyparser";

import config from "./config" ;
import middlewares from "./middlewares";
import routes from "./routes";


const app = new koa();
if (process.env.NODE_ENV === 'dev') {
    app.use(middlewares.webpack);
}
app.use(middlewares.error);
app.use(middlewares.log);
app.use(middlewares.session);
app.use(middlewares.return);
app.use(bodyParser());
app.use(middlewares.page);
app.use(middlewares.view);
app.use(middlewares.index);

app.use(routes.admin.user.routes());
app.use(routes.admin.oauth.routes());
app.use(routes.api.user.routes());
app.use(routes.public.user.routes());

app.listen(3000, () => console.log('server listen 3000'));
