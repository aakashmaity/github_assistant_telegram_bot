# GitHub Assistant Telegram Bot

A powerful Telegram bot that helps manage GitHub projects by providing commands to create pull requests, assign reviewers, merge PRs, and more. The bot integrates with GitHub's API and webhooks to provide real-time project management capabilities.

## Demo Project

This is the sample demo project being managed using the Telegram bot:

**Demo Project Repository**: [aakashmaity/demo-test-project](https://github.com/aakashmaity/demo-test-project)

The demo project showcases how the bot can effectively manage GitHub repositories through Telegram commands, demonstrating all the features and capabilities in action.

## Features

- 🤖 **Telegram Bot Integration** - Manage GitHub projects directly from Telegram
- 🔄 **GitHub Webhook Support** - Real-time updates and notifications
- 📝 **Pull Request Management** - Create, review, assign, and merge PRs
- 👥 **Collaborator Management** - Add and manage team members
- 🔍 **PR Status Tracking** - Monitor open pull requests and their status
- ⚡ **Express Server** - Webhook endpoint for GitHub integration

## Prerequisites

Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A GitHub account with repository access
- A Telegram bot token (get from [@BotFather](https://t.me/botfather))
- GitHub App setup (for enhanced API access)

## Get Started

### 1. Clone the Repository

```bash
git clone https://github.com/aakashmaity/github_assistant_telegram_bot
cd github_assistant_telegram_bot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=<your_telegram_bot_token_here>
TELEGRAM_CHAT_ID=<your_telegram_chat_id_here>

# GitHub App Configuration
GITHUB_APP_ID=<your_github_app_id>
GITHUB_PRIVATE_KEY_FILENAME=<filename_of_your_private_key.pem>
GITHUB_WEBHOOK_SECRET=<your_webhook_secret>
GITHUB_INSTALLATION_ID=<your_installation_id>  (optional)
GITHUB_TOKEN=<your_github_personal_access_token>

# Repository Configuration
GITHUB_USERNAME=<your_github_username>
GITHUB_REPO_NAME=<your_repository_name>

# Server Configuration
PORT=3000
```

### 4. GitHub Private Key Setup

1. Generate a private key for your GitHub App
2. Save the private key file (e.g., `github-app.private-key.pem`) in your project root directory
3. Update the `GITHUB_PRIVATE_KEY_FILENAME` in your `.env` file to point to this file

### 5. GitHub App Configuration

1. Go to [GitHub Developer Settings](https://github.com/settings/apps)
2. Create a new GitHub App with the following permissions:
   - Repository permissions: Contents (Read & write), Pull requests (Read & write), Metadata (Read-only)
   - Subscribe to events: Pull request, Push
3. Note down the App ID, Installation ID, and generate a private key
4. Set up webhooks pointing to your server's endpoint: `http://your-domain.com/webhook`

## Running the Project

### Development Mode

```bash
npm start
```

This will start the server with nodemon for automatic reloading during development.


The application will start and:
- Initialize the Telegram bot
- Start the Express server on the configured port
- Listen for GitHub webhooks at `/webhook`
- Launch the Telegram bot

## Available Commands

The bot supports the following commands:

- `/start` - Initialize the bot and show welcome message
- `/help` - Display available commands and their usage
- `/prs` - Show all Pull requests
- `/createpr` - Create a new pull request
- `/openprs` - List all open pull requests
- `/assign` - Assign reviewers to a pull request
- `/review` - Review a pull request
- `/merge` - Merge a pull request
- `/addcollaborator` - Add a collaborator to the repository

## Project Structure

```
src/
├── api/
│   └── githubWebhookHandler.js    # GitHub webhook handling
├── app.js                         # Main application entry point
├── bot/
│   ├── commands/                  # Bot command handlers
│   ├── scenes/                    # Conversation flows
│   └── index.js                   # Bot initialization
├── config/
│   └── index.js                   # Configuration management
├── helper/
│   └── getPRs.js                  # GitHub API helper functions
└── services/
    └── githubService.js           # GitHub service layer
```

## Environment Variables Explained

| Variable | Description | Required |
|----------|-------------|----------|
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token from @BotFather | Yes |
| `TELEGRAM_CHAT_ID` | The chat ID where the bot will operate | Yes |
| `GITHUB_APP_ID` | Your GitHub App ID | Yes |
| `GITHUB_PRIVATE_KEY_FILENAME` | Path to your GitHub App private key file | Yes |
| `GITHUB_WEBHOOK_SECRET` | Secret for verifying GitHub webhooks | Yes |
| `GITHUB_INSTALLATION_ID` | GitHub App installation ID | Yes |
| `GITHUB_CLIENT_ID` | GitHub OAuth App client ID | Yes |
| `GITHUB_TOKEN` | GitHub personal access token | Yes |
| `GITHUB_USERNAME` | Your GitHub username | Yes |
| `GITHUB_REPO_NAME` | Target repository name | Yes |
| `PORT` | Server port (default: 3000) | No |

## Troubleshooting

### Common Issues

1. **Bot not responding**: Check if `TELEGRAM_BOT_TOKEN` is correct
2. **GitHub API errors**: Verify your GitHub App permissions and installation
3. **Webhook not working**: Ensure your server is accessible and webhook URL is correct
4. **Private key errors**: Check the file path and permissions of your private key file

### Logs

The application logs important information to the console. Check for:
- Bot initialization messages
- Server startup confirmation
- GitHub webhook processing logs
- Any error messages

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Review the GitHub App and bot setup
3. Open an issue on the repository

---
