import getPRs from "../../helper/getPRs.js"

export default (bot) => {
  bot.command('openprs', async (ctx) => getPRs(ctx, 'open'))
}