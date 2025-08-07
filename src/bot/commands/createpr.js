export default (bot) => {
  bot.command('createpr', (ctx) => ctx.scene.enter('createpr_scene'));
};