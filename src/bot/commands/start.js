export default (bot) => {
  bot.start((ctx) => {
    ctx.reply(`👋 Welcome, ${ctx.from.first_name}!\n Use /help to see what I can do.`);
  });
};