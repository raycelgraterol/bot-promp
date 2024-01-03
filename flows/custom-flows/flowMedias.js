const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { handlerImageAI } = require("../../utils/utils");
const { sendMessageGeminie, geminiVision } = require("../../api/custom-calls/googleGemini.service");


module.exports = {
  flowMedias: () => {
    return addKeyword(EVENTS.MEDIA)
      .addAction(async (ctx, { flowDynamic }) => {

        await flowDynamic('He recibido tu archivo...⌛');
        //get media
        const mediaFile = await handlerImageAI(ctx);

        const imageDescription = await geminiVision(mediaFile);
        const imagePrettyText = await sendMessageGeminie(`Format the following text adapted for a WhatsApp message: ${imageDescription}`)
        await flowDynamic(imagePrettyText);

      })
  }
};
