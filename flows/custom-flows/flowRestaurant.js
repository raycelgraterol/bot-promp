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
  flowRestaurant: () => {
    return addKeyword("4", {
      sensitive: true,
    })
      .addAction(async (ctx, { endFlow, flowDynamic }) => {
        await flowDynamic('Bivenido a *La Gran Brasa*', {
          media: 'https://ivicsanttech.com/menu-brasa.jpg',
        })

        //Pending area to analyze
        const jid = ctx.key.remoteJid

        //Get number
        console.log("phone: " + ctx.from)

      })
      .addAnswer(
        `Si deseas ordenar escribe la palabra Ordenar...`,
        { capture: true },
        async (ctx, { endFlow, fallBack }) => {

          if(ctx.body.toLowerCase().includes('ordenar')) {
            await fallBack(`
              🍗𝐅𝐎𝐑𝐌𝐔𝐋𝐀𝐑𝐈𝐎🍗 

              🍗Nombre completo:

              🍗Número celular :

              🍗Pedido específico:

              🍗Hora de entrega:

              🍗Direccion de Entrega: 

              🍗Forma de Pago: 
              ⭕Necesita vuelto ¿?:
            `);
          }
        }
      );
  },
};
