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
const { flowExchangeRate } = require("./flows/custom-flows/flowGeneral")

const { flowChatGPT } = require("./flows/custom-flows/flowChatGPT");
const { flowChatGemini } = require("./flows/custom-flows/flowChatGemini");
const { flowERP } = require("./flows/custom-flows/flowERP");
const { flowRestaurant } = require("./flows/custom-flows/flowRestaurant");
const { flowNotes } = require("./flows/custom-flows/flowNotes");
const { flowMedias } = require("./flows/custom-flows/flowMedias");
const { flowChatDalle } = require("./flows/custom-flows/flowGenerateImages")
const { flowDalle3HD } = require("./flows/custom-flows/flowImagesHD")
const { flowBubble } = require("./flows/api-flows/flowBubble")
const { flowEmojis } = require("./flows/api-flows/flowEmojis")

/**
 * Funcion principal
 */
const main = async () => {
  const adapterDB = new MockAdapter();

  const adapterFlow = createFlow([
    flowInit,
    flowExchangeRate(),
    flowMedias(),
    flowNotes(chatGPT),
    flowChatGPT(chatGPT),
    flowChatGemini(),
    flowChatDalle(),
    flowDalle3HD(),
    flowERP(),
    flowRestaurant(),
    flowBubble(),
    flowEmojis(),
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
