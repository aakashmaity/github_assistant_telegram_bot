import { Telegraf, session, Scenes } from 'telegraf';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config/index.js';

// Import scenes
import createPRScene from './scenes/createPRScene.js';
import reviewPRScene from './scenes/reviewPRScene.js';
import assignPRScene from './scenes/assignPRScene.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeBot() {
  const bot = new Telegraf(config.telegram.botToken);
  const stage = new Scenes.Stage([createPRScene, reviewPRScene, assignPRScene]);

  bot.use(session());
  bot.use(stage.middleware());

  const commandsDir = path.join(__dirname, 'commands');
  const commandFiles = await fs.readdir(commandsDir);

  for (const file of commandFiles) {
    if (file.endsWith('.js')) {
      const filePath = path.join(commandsDir, file);
      const commandModule = await import(`file://${filePath}`); 
      if (commandModule.default) {
        commandModule.default(bot);
      }
    }
  }

  return bot;
}

export default initializeBot();