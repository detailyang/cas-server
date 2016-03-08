/*
* @Author: detailyang
* @Date:   2016-03-08 11:48:24
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-08 13:31:04
*/

'use strict';
import co from "co";

import session from "./session";
import ret from "./ret";
import log from "./log";
import page from "./page";
import err from "./err";
import view from "./view";
import webpack from "./webpack";


module.exports = {
    "session": session,
    "return": ret,
    "log": log,
    "page": page,
    "error": err,
    "view": view,
    "webpack": webpack,
    "index": async (ctx, next) => {
        ctx.render = co.wrap(ctx.render.bind(ctx));
        if (ctx.request.path == '/') {
           await ctx.render('index.html');
        }
        await next();
    }
}
