export default (bot) => {
    bot.command('merge', (ctx) => ctx.scene.enter('mergepr_scene'));
}