export default (bot) => {
    bot.command('assign', (ctx) => ctx.scene.enter('assign_scene'));
}