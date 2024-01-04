const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowInit = addKeyword([EVENTS.WELCOME, 'menu', 'salir', 'volver'])
  .addAnswer(
    [
      "Bienvenido a *iVicanst Tech*",
      "",
      "¿Como podemos ayudarte?",
      "*1* Conversar con Chat GPT.",
      "*2* Conversar con Gemini.",
      "*3* Conectar con ERP.",
      "*4* Conectar con Gran Brasa!.",
      " ",
      "Envia una nota de VOZ 🔊 o una Imagen 📸 tambien podre ayudarte.",
      "Consulta Tasa Monitor o BCV. 💸",
      " ",
      "Responda con el *NUMERO* de la opcion!"
    ],
    {
      media: 'https://ivicsanttech.com/ivicsant-logo.png',
    }
  ).addAction(async (ctx) => {
    console.log(`Connected phone: ${ctx.from}`);
  });

module.exports = flowInit;