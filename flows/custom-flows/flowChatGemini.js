const { addKeyword } = require("@bot-whatsapp/bot");
const { sendMessageGeminie, geminiVision } = require("../../api/custom-calls/googleGemini.service");
const flowInit = require("../custom-flows/flowInit")

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
        async (ctx, { gotoFlow, fallBack }) => {

          if(ctx.body.toLowerCase().includes('menu') || ctx.body.toLowerCase().includes('salir') || ctx.body.toLowerCase().includes('volver')) {
            return gotoFlow(flowInit);
          }

          const textFromAI = await sendMessageGeminie(ctx.body);          

          await fallBack(textFromAI);

        }
      );
  },
};
