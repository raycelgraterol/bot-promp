const { addKeyword } = require("@bot-whatsapp/bot");
const { getLastValue, getValuesMonitor } = require("../../api/custom-calls/bcvExchage.service");
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res => setTimeout(res, ms)))

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

        //Pending area to analyze
        const jid = ctx.key.remoteJid

        //Get number
        console.log("phone: " + ctx.from)

      })
      .addAnswer(
        `Ya puedes escribir y conversar con Chat GPT...`,
        { capture: true },
        async (ctx, { endFlow, fallBack }) => {

          if(ctx.body.toLowerCase().includes('menu')) {
            return endFlow();
          }

          if (ctx.body.toLowerCase().includes('bcv')) {
            //Get rates
            const exchangeRates = await getValuesMonitor()
            const bcvRate = exchangeRates['bcv'];            
            await fallBack(`La tasa actual de BCV: ${bcvRate.price}`)

          }
          else if (ctx.body.toLowerCase().includes('enparalelovzla') 
            || ctx.body.toLowerCase().includes('monitor')) {

            //Get rates
            const exchangeRates = await getValuesMonitor()
            const bcvRate = exchangeRates['enparalelovzla'];            
            await fallBack(`La tasa actual de Monitor: ${bcvRate.price}`)
            
          } else {

            const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
            await fallBack(textFromAI.text);
          }

        }
      );
  },
};
