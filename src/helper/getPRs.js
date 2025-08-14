import { config } from "../config/index.js";
import { octokit } from "../services/githubService.js";


export default async function getPRs(ctx, state, desc = "") {
    const tempMsg = await ctx.reply(`Fetching ${state.toUpperCase()} pull requests...`);

    try {
        const { data: prs } = await octokit.rest.pulls.list({
            owner: config.repo.owner,
            repo: config.repo.name,
            state
        })

        let message = `*${state.toUpperCase()} Pull Requests*\n\n`;
        prs.forEach(pr => {
            message += `*#${pr.number}*: [${pr.title}](${pr.html_url}) by _${pr.user.login}_\n`;
        });

        ctx.replyWithMarkdown(message);

    } catch (error) {
        console.error("Error fetching PRs:", error);
        ctx.reply(`😕 Sorry, an error occurred while fetching PRs.`);
    } finally {
        await ctx.telegram.deleteMessage(tempMsg.chat.id, tempMsg.message_id);
    }
}