import { Scenes } from "telegraf";
import { octokit } from "../../services/githubService.js";
import { config } from "../../config/index.js";

const createAssignScene = new Scenes.BaseScene('assign_scene');

createAssignScene.enter((ctx) => {
    ctx.scene.state.prData = {};
    ctx.reply('Let\'s assign a Pull Request!\n\nWhat is the PR number? (or /exit to cancel)');
})

createAssignScene.command('exit', (ctx) => {
    ctx.reply("Exit from assign process.");
    ctx.scene.leave();
})

createAssignScene.hears(/^\d+$/, (ctx) => {
    const state = ctx.scene.state.prData;
    if (state.prNumber) return;
    state.prNumber = parseInt(ctx.message.text, 10);

    ctx.reply('Who do you want to assign this PR to? \nPlease provide the username using ,(comma) separated.');
});

createAssignScene.on('text', async (ctx) => {
    const state = ctx.scene.state.prData;
    if (!state.prNumber) {
        return ctx.reply("Please provide the PR number first. It must be a number.");
    }
    if (state?.assignee) return; // Prevent re-triggering
   
    state.assignee = ctx.message.text.split(',').map(user => user.trim());

    const tempMsg = await ctx.reply(`Assigning PR #${state.prNumber} to ${state.assignee.join(', ')}...`);
    try {
        const {data } = await octokit.rest.issues.addAssignees({
            owner: config.repo.owner,
            repo: config.repo.name,
            issue_number: state.prNumber,
            assignees: state.assignee
        })
      
        await ctx.reply(`✅ Successfully assigned PR #${state.prNumber} to ${state.assignees.join(', ')}.`);
        ctx.scene.leave();

    } catch (error) {
        console.error("Error assigning PR:", error);
        return ctx.reply(`😕 Sorry, an error occurred while assigning the PR.`);
    } finally {
        await ctx.telegram.deleteMessage(tempMsg.chat.id, tempMsg.message_id);
    }
})

export default createAssignScene;
