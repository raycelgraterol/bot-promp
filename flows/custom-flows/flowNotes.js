const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { handlerAI } = require("../../utils/utils");


/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */
module.exports = {
    flowNotes: (chatgptClass) => {
        return addKeyword(EVENTS.VOICE_NOTE)
        .addAction(async (ctx, ctxFn) => {

            console.log(`[Flow Smart VoiceNote]`)

            await ctxFn.flowDynamic("Procesando nota de voz...⌛");
            //Raw text 
            const text = await handlerAI(ctx);

            const prettyText = await chatgptClass.handleMsgChatGPT(`Format the following text adapted for a WhatsApp message also add emojis: ${text}`);

            const responseUseChat = await chatgptClass.handleMsgChatGPT(`genera una respuesta sobre esto: ${text}`);

            await ctxFn.flowDynamic(prettyText.text);

            await ctxFn.flowDynamic("Respuesta del chat: ");
            await ctxFn.flowDynamic(responseUseChat.text);

        });
    },
};