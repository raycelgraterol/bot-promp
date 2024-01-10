const { addKeyword } = require("@bot-whatsapp/bot");

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */
module.exports = {
  flowERP: (chatgptClass) => {
    return addKeyword("3", {
      sensitive: true,
    })
      .addAction(async (ctx, { endFlow, flowDynamic }) => {
        await flowDynamic("Estamos construyendo una consulta sobre una base de datos con 700 articulos...")

        //Pending area to analyze
        const jid = ctx.key.remoteJid;
        
        return endFlow();
      });
  },
};
