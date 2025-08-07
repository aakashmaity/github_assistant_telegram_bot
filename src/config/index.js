import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

function readGithubPrivateKey() {
    const keyPath = process.env.GITHUB_PRIVATE_KEY_FILENAME;

    if(!keyPath){
        throw new Error("GITHUB_PRIVATE_KEY_FILENAME is not set in the .env file.");
    }

    const absolutePath = path.resolve(process.cwd(), keyPath);

    try {
        return fs.readFileSync(absolutePath, 'utf8');
    } catch (err) {
        console.log(`Error reading the private key file at ${absolutePath}:`, err);

        process.exit(1);
    }
}
export const config = {
    telegram: {
        botToken: process.env.TELEGRAM_BOT_TOKEN,
        chatId : process.env.TELEGRAM_CHAT_ID
    },
    github: {
        appId : process.env.GITHUB_APP_ID,
        githubPrivateKey: readGithubPrivateKey(),
        webhookSecret: process.env.GITHUB_WEBHOOK_SECRET,
        installationId: process.env.GITHUB_INSTALLATION_ID,
        clientId: process.env.GITHUB_CLIENT_ID,
        token: process.env.GITHUB_TOKEN
    },
    repo: {
        owner: process.env.GITHUB_USERNAME,
        name: process.env.GITHUB_REPO_NAME
    },
    server: {
        port: process.env.PORT || 3000,
    }
}