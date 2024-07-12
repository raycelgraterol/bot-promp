const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowInit = addKeyword([EVENTS.WELCOME, 'menu', 'salir', 'volver'])
  .addAnswer(
    [
      "Bienvenido a *iVicanst Tech*",
      "",
      "¿Como podemos ayudarte?",
      "*1* Conversar con Chat GPT-4.",
      "*2* Conversar con Gemini Google.",
      "*3* Conectar con ERP.",
      "*4* Conectar con la Gran Brasa.",
      " ",
      "Envia una nota de VOZ 🔊 o una Imagen 📸 tambien podre ayudarte.",
      "Consulta Tasa Monitor o BCV. 💸",
      " ",
      "Responda con el *NUMERO* de la opcion!"
    ],
    {
      media: 'https://enlacedeportivo.com/ivicsant-logo.png',
    }
  ).addAction(async (ctx) => {
    console.log(`Connected phone: ${ctx.from}`);
  });

module.exports = flowInit;