const { addKeyword } = require("@bot-whatsapp/bot");
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res =>  setTimeout(res, ms)))

/**
 * Recuperamos el prompt "TECNICO"
 */
const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "01_TECNICO.txt"), "utf-8");
  return text;
};

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
        await flowDynamic("Conectado a Chat GPT")

        //Pending area to analyze
        const jid = ctx.key.remoteJid
        console.log(ctx)
        console.log("JID: " + jid)

        //Get number
        console.log("phone: " + ctx.from)

        var firstText = await chatgptClass.handleMsgChatGPT("Eres chat GPT?");

        await flowDynamic(firstText.text);
      })
      .addAnswer(
        `Ya puedes escribir y conversar con Chat GPT...`,
        { capture: true },
        async (ctx, { fallBack }) => {

          const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
          await fallBack(textFromAI.text);

        }
      );
  },
};
