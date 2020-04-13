export default (router) => {
  router
  .get('root', '/', async (ctx) => {
    // ctx.state.flash= ctx.flash.get() || [];
    // console.log('Okey, flash is: ', ctx.flashMessage);
    // ctx.session = {}
    // console.log(ctx.session);
    await ctx.render('welcome/welcome');
  })

}
