import Router from 'koa-router';
const router = new Router();

router
  .get('/', function (ctx, next) {
    ctx.body = {
      route: 'index',
      url: ctx.url
    };
  });
export default router;
