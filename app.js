require("dotenv").config();
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

/**
 * ChatGPT
 */
const ChatGPTClass = require("./chatgpt.class");
const chatGPT = new ChatGPTClass();

/**
 * Flows
 */
const flowInit = require("./flows/custom-flows/flowInit");
const { flowChatGPT } = require("./flows/custom-flows/flowChatGPT");
const { flowChatGemini } = require("./flows/custom-flows/flowChatGemini");
const { flowERP } = require("./flows/custom-flows/flowERP");
const flotNotes = require("./flows/custom-flows/flowNotes");
const flowMedias = require("./flows/custom-flows/flowMedias");


/**
 * Funcion principal
 */
const main = async () => {
  const adapterDB = new MockAdapter();

  const adapterFlow = createFlow([
    flowInit,
    flotNotes,
    flowMedias,
    flowChatGPT(chatGPT),
    flowChatGemini(),
    flowERP(),
  ]);

  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
