const { addKeyword } = require("@bot-whatsapp/bot");
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res => setTimeout(res, ms)))

const flowInit = require("../custom-flows/flowInit")
const { flowNotes } = require("../custom-flows/flowNotes")

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */
module.exports = {
  flowChatGPT: (chatgptClass) => {
    return addKeyword("1", {
      sensitive: true,
    })
      .addAction(async (ctx, { endFlow, flowDynamic }) => {
        await flowDynamic("Conectando...")
        
        console.log("Usando Chat GPT")        

      })
      .addAnswer(
        `Ya puedes escribir y conversar con Chat GPT...`,
        { capture: true },
        async (ctx, { gotoFlow, fallBack }) => {

          if(ctx.body.toLowerCase().includes('menu') || ctx.body.toLowerCase().includes('salir') || ctx.body.toLowerCase().includes('volver')) {
            return gotoFlow(flowInit);
          }

          const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
          await fallBack(textFromAI.text);

        }
      );
  },
};
