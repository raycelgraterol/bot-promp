const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowMedias = addKeyword(EVENTS.MEDIA)
    .addAnswer('He recibido tu foto o video')
    .addAction(async (ctx, { flowDynamic }) => {
        await flowDynamic("verifando...")

        //Get all
        console.log(ctx)

      })

module.exports = flowMedias;