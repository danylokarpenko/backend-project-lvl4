import Koa from 'koa';
import Pug from 'koa-pug';
import Router from 'koa-router';
import Rollbar from 'rollbar';
import serve from 'koa-static';
import koaWebpack from 'koa-webpack';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import flash from 'koa-flash-simple';
import session from 'koa-session';
import methodOverride from 'koa-methodoverride'
import path from 'path';
import webpackConfig from './webpack.config';
import addRoutes from './routes';
import container from './container';

const rollbar = new Rollbar({
  accessToken: '2a409f450d4640f6a004fdd38a1e12dd',
  captureUncaught: true,
  captureUnhandledRejections: true
});

export default () => {
  const app = new Koa();
  const router = new Router();
  app.keys = ['newest secret key', 'older secret key'];
  app.use(session(app)); // Session middleware has to be added before flash
  app.use(flash());
  app.use(async (ctx, next) => {
    ctx.state.isSingedIn = () => ctx.session.userId !== undefined;
    ctx.state.flash = ctx.flash;
    try {
      await next()
    } catch (error) {
      console.log(error);
      rollbar.error(error, ctx.request)
    }
  });
  app.use(methodOverride('_method'));
  const pug = new Pug({
    viewPath: path.resolve(__dirname, './views'),
    locals: {},
    basedir: 'path/for/pug/extends',
    helperPath: [
      { _: require('lodash') }
    ],
  });

  if(process.env.NODE_ENV !== 'production') {
    koaWebpack({
      config: webpackConfig,
    }).then((m) => app.use(m));
  }


  app.use(bodyParser());
  app.use(koaLogger());
  app.use(serve(path.resolve(__dirname, 'public')));
  pug.use(app);
  addRoutes(router, container);
  app
    .use(router.routes())
    .use(router.allowedMethods());

  return app;
}
