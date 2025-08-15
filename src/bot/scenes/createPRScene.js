import { Scenes } from "telegraf";
import { octokit } from "../../services/githubService.js";
import { config } from "../../config/index.js";


const createPRScene = new Scenes.BaseScene('createpr_scene');

createPRScene.enter((ctx) => {
    ctx.scene.state.prData = {};
    ctx.reply('What is the title?');
});

createPRScene.command('exit', (ctx) => {
    ctx.reply("Exit from PR create process.");
    ctx.scene.leave()
});

createPRScene.on('text', async (ctx) => {
    const state = ctx.scene.state.prData;

    if (!state.title) {
        state.title = ctx.message.text;
        ctx.reply('Please mention the source branch?');
    } else if (!state.head) {
        state.head = ctx.message.text;
        ctx.reply('Please mention the target branch?');
    } else {
        state.base = ctx.message.text;
        const tempMsg = await ctx.reply(`Creating PR: "${state.title}"\nFrom \`${state.head}\` to \`${state.base}\`...`);
        try {
            const { data: pr } = await octokit.rest.pulls.create({
                owner: config.repo.owner,
                repo: config.repo.name,
                title: state.title,
                head: state.head,
                base: state.base,
                body: `PR created via Telegram by ${ctx.update.message.from.first_name}`
            });
            await ctx.reply(`✅ Successfully created PR #${pr.number}!\n${pr.html_url}`);
        } catch (error) {
            console.error("Error creating PR:", error);
            await ctx.reply(`😕 Failed to create PR. GitHub said: ${error.message}`);
        } finally {
            await ctx.telegram.deleteMessage(tempMsg.chat.id, tempMsg.message_id);
            
        }
        ctx.scene.leave();
    }
})

export default createPRScene;