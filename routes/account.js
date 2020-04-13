import buildFormObj from '../lib/buildFormObj'
import { User, sequelize } from '../models'

export default (router) => {
  router
  .get('account', '/account/profile', async (ctx) => {
    const userId = ctx.session.userId;
    const user = await User.findByPk(userId);
    await ctx.render('account/profile', { f: buildFormObj(user) });
  })
  .get('account', '/account/setting', async (ctx) => {
    const userId = ctx.session.userId;
    const user = await User.findByPk(userId);
    await ctx.render('account/setting', { f: buildFormObj(user) });
  })
}
