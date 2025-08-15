export default (bot) => {
    bot.command('help', (ctx) => {
        ctx.reply("Available commands:\n\n" +
            "/prs - Get all PRs\n" +
            "/openprs - Get open PRs\n" +
            "/createpr - Create a new PR\n" +
            "/merge - Merge a Pull Request\n" +
            "/reviewpr - Review a PR\n" +
            "/assign - Assign a Pull Request to user(s)\n" +
            "/start - Start the bot\n" +
            "/help - Show this help message\n" +
            "/exit - Exit"
        );
    });
}