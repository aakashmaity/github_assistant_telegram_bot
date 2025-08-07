
import { config } from '../../config/index.js';
import { octokit } from '../../services/githubService.js';

export default (bot) => {
  bot.command('listprs', async (ctx) => {
    await ctx.reply('Fetching open pull requests...');
    try {
      // console.log("octakit instance:", octokit.pulls);
      const { data: prs } = await octokit.rest.pulls.list({
        owner: config.repo.owner,
        repo: config.repo.name,
        state: 'all',
      });

      if (prs.length === 0) {
        return ctx.reply('✅ No open pull requests found.');
      }

      let message = '*Open Pull Requests:*\n\n';
      prs.forEach(pr => {
        message += `*#${pr.number}*: \`${pr.title}\` by _${pr.user.login}_\n`;
      });
      // replyWithMarkdownV2 requires escaping characters like '.', '(', ')', etc.
      // For simplicity, we use the older `Markdown` parse mode.
      ctx.replyWithMarkdown(message);

    } catch (error) {
      console.error("Error fetching PRs:", error);
      ctx.reply(`😕 Sorry, an error occurred while fetching PRs.`);
    }
  });
};