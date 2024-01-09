const { addKeyword } = require("@bot-whatsapp/bot");
const { getArticle, getAllArticles } = require("../../api/custom-calls/bubleCheck.service");

const { completionGTP4 } = require("../../api/custom-calls/openAICustom")

/**
 * Exportamos
 * @returns
 */
module.exports = {
  flowBubble: () => {
    return addKeyword("bubble", {
      sensitive: true,
    })
      .addAction(async (ctx, { endFlow, flowDynamic }) => {

        //Pending area to analyze
        const jid = ctx.key.remoteJid

        //Get number
        console.log("Connected to bubble")

      })
      .addAnswer(
        `Ya puedes consultar bubble...`,
        { capture: true },
        async (ctx, { gotoFlow, fallBack, flowDynamic }) => {

          if (ctx.body.toLowerCase().includes('menu') || ctx.body.toLowerCase().includes('salir') || ctx.body.toLowerCase().includes('volver')) {
            return gotoFlow(flowInit);
          }

          const articles = await getAllArticles();

          const totalArticles = articles.length;
          await flowDynamic(`Cantidad de articulos: ${totalArticles}`);

          await fallBack();

        }
      );
  },
};
