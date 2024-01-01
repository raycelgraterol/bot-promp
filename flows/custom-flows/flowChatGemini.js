const { addKeyword } = require("@bot-whatsapp/bot");
const { sendMessageGeminie } = require("../../api/custom-calls/googleGemini.service");

/**
 * Exportamos
 * @returns
 */
module.exports = {
  flowChatGemini: () => {
    return addKeyword("2", {
      sensitive: true,
    })
      .addAction(async (ctx, { endFlow, flowDynamic }) => {
        await flowDynamic("Conectando...")

        //Pending area to analyze
        const jid = ctx.key.remoteJid

        //Get number
        console.log("phone: " + ctx.from)

      })
      .addAnswer(
        `Ya puedes escribir y conversar con Chat de Google Gemini...`,
        { capture: true },
        async (ctx, { endFlow, fallBack }) => {

          if(ctx.body.toLowerCase().includes('menu')) {
            return endFlow();
          }

          const textFromAI = await sendMessageGeminie(ctx.body);

          await fallBack(textFromAI);

        }
      );
  },
};
