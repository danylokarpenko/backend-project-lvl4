import buildFormObj from '../lib/buildFormObj'
import { User, sequelize } from '../models'

export default (router) => {
  router
  .get('users', '/users', async (ctx) => {
    const users = await User.findAll();
    // users.every(user => user.destroy());
    await ctx.render('users', { users });
  })
  .get('newUser', '/users/new', async (ctx) => {
      const user = User.build();
      await ctx.render('users/new', { f: buildFormObj(user) });
  })
  .post('users', '/users', async (ctx) => {
    const { request: { body: form } } = ctx;
    const user = User.build(form);
    try {
      await user.save();
      ctx.flash.set({ type: 'success', msg: 'User has been created.' });
      await ctx.redirect(router.url('root'));
    } catch (e) {
      ctx.flash.set({ type: 'danger', msg: 'Ooops, user has not been created.' });
      await ctx.render('users/new', { f: buildFormObj(user, e) });
    }
  })
  .patch('editUser', '/users', async (ctx) => {
    const { request: { body: form } } = ctx;
    const userId = ctx.session.userId;
    const error = { errors: [] };
    const user = await User.findByPk(userId);

    try {
      console.log(form);
      await user.update(form);
      ctx.flash.set({ type: 'info', msg: 'Account has been edited.' });
      await ctx.redirect(router.url('account'));
    } catch (e) {
      ctx.flash.set({ type: 'warning', msg: 'Ooops, something is not correct.' });
      console.log('Dark!!!!');
      await ctx.render('account/profile', { f: buildFormObj(form, e) })
    }
  })
}
