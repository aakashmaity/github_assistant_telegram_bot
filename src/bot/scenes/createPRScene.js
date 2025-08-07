import { Scenes } from "telegraf";
import { octokit } from "../../services/githubService.js";
import { config } from "../../config/index.js";


const createPRScene = new Scenes.BaseScene('createpr_scene');

createPRScene.enter((ctx) => {
    ctx.scene.state.prData = {};
    ctx.reply('Let\'s create a new Pull Request! \nWhat is the title?');
});

createPRScene.on('text', async (ctx) => {
    const state = ctx.scene.state.prData;

    if (!state.title) {
        state.title = ctx.message.text;
        ctx.reply('What is the source branch (the "head" branch)?');
    } else if (!state.head) {
        state.head = ctx.message.text;
        ctx.reply('What is the target branch (the "base" branch, e.g., `main`)?');
    } else {
        state.base = ctx.message.text;
        await ctx.reply(`Creating PR: "${state.title}"\nFrom \`${state.head}\` to \`${state.base}\`...`);
        try {
            const { data: pr } = await octokit.rest.pulls.create({
                owner: config.repo.owner,
                repo: config.repo.name,
                title: state.title,
                head: state.head,
                base: state.base,
                body: `PR created via Telegram by @${ctx.update.message.from.first_name}`
            });
            await ctx.reply(`✅ Successfully created PR #${pr.number}!\n${pr.html_url}`);
        } catch (error) {
            console.error("Error creating PR:", error);
            await ctx.reply(`😕 Failed to create PR. GitHub said: ${error.message}`);
        }

        // End the scene
        return ctx.scene.leave();
    }
})


createPRScene.command('exit', (ctx) => ctx.scene.leave());

export default createPRScene;