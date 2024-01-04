const { addKeyword } = require("@bot-whatsapp/bot");
const { getLastValue, getValuesMonitor } = require("../../api/custom-calls/bcvExchage.service");

/**
 * Exportamos
 * @returns
 */
module.exports = {
    flowExchangeRate: () => {
        return addKeyword(["monitor", "bcv"], {
            sensitive: false,
        })
            .addAction(async (ctx, { endFlow, flowDynamic, fallBack }) => {

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

                }

            });
    },
};
