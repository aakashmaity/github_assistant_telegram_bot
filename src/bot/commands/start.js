export default (bot) => {
  bot.start((ctx) => {
    ctx.reply(`👋 Welcome, ${ctx.from.first_name}!\n Use /help to see what I can do.`,
      {
        reply_markup: {
          keyboard: [['/openprs', '/review']],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      }
    );
  });
};