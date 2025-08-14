import getPRs from "../../helper/getPRs.js"

export default (bot) => {
  bot.command('prs', async (ctx) => getPRs(ctx, 'all'))
}