//import 'babel-polyfill';
import Koa from 'koa';
import co from 'co';
import convert from 'koa-convert';
import json from 'koa-json';
import jsonp from 'koa-jsonp';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';

import router from './routes/all' ;
import db from './db' ;

const app = new Koa();

// middlewares
app.use(convert(bodyparser()));
app.use(convert(json()));
app.use(convert(jsonp()));
app.use(convert(logger()));



app.use(async (ctx, next) => {
  ctx.render = co.wrap(ctx.render); 
  await next();
});

// 输出日志
app.use(async (ctx, next) => {
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(router.routes(), router.allowedMethods());


app.on('error', (err, ctx) => {
  log.error('server error', err, ctx);
});

export default app;