import express from 'express';
import {config} from './config/index.js';
import botPromise from './bot/index.js';
import getWebhookHandler from './api/githubWebhookHandler.js';

async function startApp() {

  const bot = await botPromise;
  console.log('Bot initialized.');

  const app = express();
  const githubWebhookHandler = getWebhookHandler(bot);
  app.use(githubWebhookHandler);

  app.listen(config.server.port, () => {
    console.log(`Server listening for webhooks at http://localhost:${config.server.port}/api/github`);
  });

  await bot.launch(() => {
    console.log('Telegram bot is running...');
  });
  

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

startApp().catch(error => {
  console.error("Failed to start the application:", error);
});