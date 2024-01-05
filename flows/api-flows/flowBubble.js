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

          for (let i = 0; i < totalArticles; i += 100) {
            const currentBatch = articles.slice(i, i + 100);

            const check = await completionGTP4(`
            Tengo la siguiente lista de articulos:
            [ ${currentBatch} ]
            ahora mis clientes haran busquedas y me daras los resultados que mas se relacionen.
            Escribe los tittle reales de los articulo en la lista de articulos que se relacione con este texto: ${ctx.body}`);

            const getCheck = check.data.choices[0].message.content;

            await flowDynamic(getCheck);
          }

          await fallBack();

        }
      );
  },
};
