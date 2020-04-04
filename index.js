import Koa from 'koa';
import Pug from 'koa-pug';
import Router from 'koa-router';
import Rollbar from 'rollbar';
import serve from 'koa-static';

import path from 'path';

import addRoutes from './routes';
import container from './container';

export default () => {
  const app = new Koa();
  const router = new Router();
  const rollbar = new Rollbar({
    accessToken: '2a409f450d4640f6a004fdd38a1e12dd',
    captureUncaught: true,
    captureUnhandledRejections: true
  });
  const pug = new Pug({
    viewPath: path.resolve(__dirname, './views'),
    locals: { /* variables and helpers */ },
    basedir: 'path/for/pug/extends',
    helperPath: [
      { _: require('lodash') }
    ],
    // app: app // Binding `ctx.render()`, equals to pug.use(app)
  });
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      rollbar.error(error, ctx.request)
    }
  });
  app.use(serve(path.resolve(__dirname, 'public')));
  pug.use(app);
  addRoutes(router, container);
  app
    .use(router.routes())
    .use(router.allowedMethods());

  return app;
}
