import Router from 'koa-router';
import home from './home';
import user from './user';
import demo from './demo';

const router = new Router();

router.use('/', home.routes(), home.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
router.use('/demo', demo.routes(), demo.allowedMethods());

export default router;
