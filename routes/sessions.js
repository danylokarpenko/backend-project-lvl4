import buildFormObj from '../lib/buildFormObj'
import { User } from '../models'
import { encrypt } from '../lib/secure'
import formError from '../lib/error'

export default (router) => {
  router
  .get('newSession', '/session', async (ctx) => {
    const data = {};
    await ctx.render('sessions/newSession', { f: buildFormObj({ method: 'get' }) });
  })
  .post('setSession', '/session', async (ctx) => {
    const { email, password } = ctx.request.body;
    const error = {
      errors: []
    };
    const user = await User.findOne({
      where: { email },
    });
    console.log(user);
    if (!user) {
      error.errors.push(formError({
        message: 'User is not exists',
        path: 'email'
      }))
    }
    if (user && user.passwordDigest === encrypt(password)) {
      ctx.session.userId = user.id;
      ctx.flash.set({ type: 'success', msg: 'You have signed in!' })
      await ctx.redirect(router.url('root'));
    } else {
      ctx.flash.set({ type: 'danger', msg: 'Email or password is wrong!' });
      await ctx.render('sessions/newSession', { f: buildFormObj({ email, password }, error)});
    };

  })
  .delete('sessionDestroy', '/session', async (ctx) => {
    ctx.session = {};
    await ctx.redirect(router.url('root'))
  })
}
