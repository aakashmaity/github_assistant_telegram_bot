import { Scenes } from "telegraf";
import { config } from "../../config/index.js";
import { octokit } from "../../services/githubService.js";



const createCollaboratorPRScene = new Scenes.BaseScene('collaboratorpr_scene');

createCollaboratorPRScene.enter((ctx) => {
    ctx.scene.state.prData = {};
    ctx.reply('Please provide the username. \n(or /exit to cancel)');
})

createCollaboratorPRScene.command('exit', (ctx) => {
    ctx.reply("Exit from collaborator add process.");
    ctx.scene.leave();
})

createCollaboratorPRScene.on('text', async (ctx) => {
    const state = ctx.scene.state.prData;
    if (!state.username) {
        state.username = ctx.message.text.trim();
        ctx.reply(`You have entered the username: ${state.username} \n\nPlease confirm 'yes' to add this user or 'no' to cancel.`);
    }
    else if (state.username && !state.confirmation) {
        const confirmation = ctx.message.text.toLowerCase();
        if (confirmation !== 'yes' && confirmation !== 'no' && confirmation !== 'y' && confirmation !== 'n') {
            return ctx.reply("Please confirm 'yes' to add this user or 'no' to cancel.");
        }
        state.confirmation = confirmation;

        if (confirmation === 'no') {
            return ctx.reply('Collaborator add process cancelled.');
        }
        const tempMsg = await ctx.reply(`Adding collaborator: ${state.username}...`);
        try {
            await octokit.rest.repos.addCollaborator({
                owner: config.repo.owner,
                repo: config.repo.name,
                username: state.username,
                permission: 'push'
            });

            await ctx.reply(`✅ Successfully sent invitation request to ${state.username} join as a collaborator.`);
            
        } catch (error) {
            console.log("Error adding collaborator:", error);
            return ctx.reply(`😕 Sorry, an error occurred while adding the collaborator. GitHub said: ${error.message}`);
        } finally {
            await ctx.telegram.deleteMessage(tempMsg.chat.id, tempMsg.message_id);
            ctx.scene.leave();
        }
    } else {
        return ctx.reply("Please provide a valid username first.");
    }
});

export default createCollaboratorPRScene;