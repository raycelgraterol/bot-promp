const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowInit = addKeyword(EVENTS.WELCOME)
  .addAnswer(
    "Bivenido a *iVicanst Tech*",
    "Sistemas adminitrativos y app nativas con AI."
  )
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