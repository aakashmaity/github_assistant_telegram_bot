export default (bot) => {
    bot.command('reviewpr', (ctx) => ctx.scene.enter('reviewpr_scene'));
};