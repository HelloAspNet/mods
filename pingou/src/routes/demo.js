import Router from 'koa-router';
const router = new Router();

let id;

router
  //.param('msg', async (val, ctx, next) => {
  //  console.log(12222)
  //  id = val;
  //  await next();
  //})
  .get('/', function (ctx, next) {
    ctx.body = {
      name: 'tuku'
    };
  })
  .get('/:msg', function (ctx, next) {
    console.log(this)
    ctx.body = {
      name: 'tuku',
      id: id,
      ctx: ctx
    };
  });
export default router;
