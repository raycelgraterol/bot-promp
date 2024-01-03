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

            await ctxFn.flowDynamic(prettyText.text);


        });
    },
};