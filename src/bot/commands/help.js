export default (bot) => {
    bot.command('help', (ctx) => {
        ctx.reply("Available commands:\n\n" +

            "/start - Start the bot\n" +
            "/help - Display available commands and their usage\n" +
            "/exit - Exit" +
            "/prs - Show all Pull requests\n" +
            "/openprs - List all open pull requests\n" +
            "/createpr - Create a new pull request\n" +
            "/merge - Merge a Pull Request\n" +
            "/reviewpr - Review a Pull request\n" +
            "/assign - Assign a Pull Request to user(s)\n" +
            "/addcollaborator - Add a collaborator to the Project repo\n"
        );
    });
}