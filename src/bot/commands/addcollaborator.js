export default (bot) => {
    bot.command('addcollaborator', (ctx) => ctx.scene.enter('collaboratorpr_scene'));
}