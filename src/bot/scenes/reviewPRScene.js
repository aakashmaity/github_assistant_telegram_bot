import { Scenes, Markup } from 'telegraf';
import { octokit } from '../../services/githubService.js';
import { config } from '../../config/index.js';

const reviewPRScene = new Scenes.BaseScene('reviewpr_scene');

reviewPRScene.enter((ctx) => {
    ctx.scene.state.reviewData = {};
    ctx.reply('Enter the PR number? (or /exit to cancel)');
});

reviewPRScene.command('exit', (ctx) => {
    ctx.reply("Exit from review process.");
    ctx.scene.leave()
});

reviewPRScene.hears(/^\d+$/, (ctx) => {
    const state = ctx.scene.state.reviewData;
    if (state.prNumber) return; // Prevent re-triggering
    state.prNumber = parseInt(ctx.message.text, 10);
    ctx.reply('What is your review comment?');
});

reviewPRScene.on('text', async (ctx) => {
    const state = ctx.scene.state.reviewData;
    if (!state.prNumber) {
        return ctx.reply("Please provide the PR number first. It must be a number.");
    }
    if (state.comment) return; // Prevent re-triggering

    state.comment = ctx.message.text;

    await ctx.reply('What action do you want to take?', Markup.inlineKeyboard([
        Markup.button.callback('Approve ✅', 'APPROVE'),
        Markup.button.callback('Comment 💬', 'COMMENT'),
        Markup.button.callback('Request Changes ❌', 'REQUEST_CHANGES'),
    ]));
});

reviewPRScene.on('callback_query', async (ctx) => {
    const event = ctx.callbackQuery.data;
    const { prNumber, comment } = ctx.scene.state.reviewData;

    const tempMsg = await ctx.editMessageText(`Submitting review for PR #${prNumber}`);

    try {
        await octokit.rest.pulls.createReview({
            owner: config.repo.owner,
            repo: config.repo.name,
            pull_number: prNumber,
            body: comment,
            event: event
        });
        await ctx.reply(`✅ Successfully submitted review for PR #${prNumber}.`);
    } catch (error) {
        console.error("Error creating review:", error);
        await ctx.reply(`😕 Failed to create review. GitHub said: ${error.message}`);
    } finally {
        await ctx.telegram.deleteMessage(tempMsg.chat.id, tempMsg.message_id);
    }

    return ctx.scene.leave();
});



export default reviewPRScene;