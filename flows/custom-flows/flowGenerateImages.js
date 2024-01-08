const { addKeyword } = require("@bot-whatsapp/bot");
const { useDalle2, useDalle3 } = require("../../api/custom-calls/openAICustom");
const flowInit = require("../custom-flows/flowInit")

/**
 * Exportamos
 * @returns
 */
module.exports = {
    flowChatDalle: () => {
        return addKeyword("5", {
            sensitive: true,
        })
            .addAction(async (ctx, { endFlow, flowDynamic }) => {

                //Get number
                console.log("Usando Dall-e 2")
            })
            .addAnswer(
                `Puedes escribir y generar Imagenes con Dall-e 3...`,
                { capture: true },
                async (ctx, { gotoFlow, fallBack, flowDynamic }) => {

                    await flowDynamic("Generando imagen...⌛");

                    if (ctx.body.toLowerCase().includes('menu') || ctx.body.toLowerCase().includes('salir') || ctx.body.toLowerCase().includes('volver')) {
                        return gotoFlow(flowInit);
                    }

                    const resultImage = await useDalle2(ctx.body);

                    await flowDynamic(ctx.body, {
                        media: resultImage.url,
                    });

                    await fallBack();
                }
            );
    },
};
