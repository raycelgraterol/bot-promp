const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowNotaDeVoz = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer('Dame un momento para escuchar la nota de voz')

module.exports = flowNotaDeVoz;