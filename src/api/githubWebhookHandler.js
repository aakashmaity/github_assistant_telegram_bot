import { createNodeMiddleware } from '@octokit/webhooks';
import { app } from '../services/githubService.js';
import { config } from '../config/index.js';

export default function getWebhookHandler(bot) {
  app.webhooks.on('pull_request.opened', async ({ payload }) => {
    console.log('New Pull Request Opened Event Received');
    const pr = payload.pull_request;
    // console.log("pr:", pr);
    const message = `
  🚨 *New Pull Request Opened* in \`${config.repo.owner}/${config.repo.name}\`

  *#${pr.number}: ${pr.title}*
  *Author*: ${pr.user.login}
  *Branch*: \`${pr.base.label}\`  ⬅️  \`${pr.head.label}\`
  \`\`\`${pr.html_url}\`\`\`
  `;

    try {
      await bot.telegram.sendMessage(config.telegram.chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
    }
  });

  app.webhooks.onError((error) => {
    console.error(`Webhook Error: ${error.message}`);
  });

  return createNodeMiddleware(app.webhooks, { path: '/webhook' });
}