const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowInit = addKeyword([EVENTS.WELCOME, 'menu'])
  .addAnswer('Bivenido a *iVicanst Tech*', {
    media: 'https://ivicsanttech.com/ivicsant-logo.png',
  })
  .addAnswer(
    [
      "¿Como podemos ayudarte?",
      "",
      "*1* Conversar con Chat GPT.",
      "*2* Conversar con Gemini.",
      "*3* Conectar con ERP."
    ]
  )
  .addAnswer('Responda con el numero de la opcion!')

module.exports = flowInit;