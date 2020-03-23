// include and initialize the rollbar library with your access token
import Koa from 'koa';
import Rollbar from 'rollbar';
const rollbar = new Rollbar({
  accessToken: '2a409f450d4640f6a004fdd38a1e12dd',
  captureUncaught: true,
  captureUnhandledRejections: true
});

rollbar.log("Application!");

export default () => {
  const app = new Koa();
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // will only respond with JSON
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: err.message
      };
      rollbar.error(err.message, err)
    }
  })

  app.use(async (ctx, next) => {
    ctwx.body = 'Big zopa!!!!!!!!!!';
    throw new Error('Big zopa')
    await next();
  })

  return app;
}
// record a generic message and send it to Rollbar
