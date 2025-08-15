import { Scenes } from "telegraf";
import { octokit } from "../../services/githubService.js";
import { config } from "../../config/index.js";

const createMergeScene = new Scenes.BaseScene('mergepr_scene');

createMergeScene.enter((ctx) => {
    ctx.scene.state.prData = {};
    ctx.reply('Let\'s merge a Pull Request!\n\nWhat is the PR number? (or /exit to cancel)');
})

createMergeScene.command('exit', (ctx) => {
    ctx.reply("Exit from merge process.");
    ctx.scene.leave();
})

createMergeScene.hears(/^\d+$/, (ctx) => {
    const state = ctx.scene.state.prData;
    if (state.prNumber) return;
    state.prNumber = parseInt(ctx.message.text, 10);
    ctx.reply("Are you sure you want to merge this PR? \n\n'yes' or 'no' to cancel.");
});

createMergeScene.on('text', async (ctx) => {
    const state = ctx.scene.state.prData;
    if (!state.prNumber) {
        return ctx.reply("Please provide the PR number first. It must be a number.");
    }
    if (state?.confirmation) return;

    const confirmation = ctx.message.text.toLowerCase();
    if (confirmation !== 'yes' && confirmation !== 'no' && confirmation !== 'y' && confirmation !== 'n') {
        return ctx.reply("Please reply with 'yes' to confirm merging or 'no' to cancel.");
    }
    state.confirmation = confirmation;

    if (confirmation === 'no') {
        return ctx.reply('Merge process cancelled.');
    }
    const tempMsg = await ctx.reply(`Merging PR #${state.prNumber} ...`);

    try {
        await octokit.rest.pulls.merge({
            owner: config.repo.owner,
            repo: config.repo.name,
            pull_number: state.prNumber,
        })
        await ctx.reply(`✅ Successfully merged PR #${state.prNumber}.`);
    } catch (error) {
        console.error("Error merging PR:", error);
        return ctx.reply(`😕 Sorry, an error occurred while merging the PR. Github said: ${error.message}`);
    } finally {
        await ctx.telegram.deleteMessage(tempMsg.chat.id, tempMsg.message_id)
        ctx.scene.leave();
    }

});

export default createMergeScene;