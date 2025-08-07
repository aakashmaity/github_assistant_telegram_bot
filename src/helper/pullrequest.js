
export async function handleNewPR(payload, bot) {
    console.log("payload", payload)
    const pr = payload.pull_request

    const message = `${pr.number}`

    try {
        await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, `New Pull Request: ${message}`, {
            parse_mode: 'Markdown',
        });
    } catch (error) {
        console.log("Failed to send Telegram message")
    }
}