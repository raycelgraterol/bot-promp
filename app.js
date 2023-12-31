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

/**
 * Funcion principal
 */
const main = async () => {
  const adapterDB = new MockAdapter();

  const adapterFlow = createFlow([
    flowInit,
    flowChatGPT(chatGPT),
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
