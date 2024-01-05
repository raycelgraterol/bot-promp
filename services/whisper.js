const fs = require("fs");
const OpenAI = require("openai");

/**
 *
 * @param {*} path url mp3
 */
const voiceToText = async (path) => {
  if (!fs.existsSync(path)) {
    throw new Error("No se encuentra el archivo");
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const resp = await openai.audio.transcriptions.create(
      { model: "whisper-1", file: fs.createReadStream(path) }
    );

    return resp.data.text;
  } catch (err) {
    console.log(err.response.data)
    return "ERROR";
  }
};

module.exports = { voiceToText };
