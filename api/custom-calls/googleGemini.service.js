const axios = require("axios");

const sendMessageGeminie = async (text) => {
  try {
    const generateContent = {
      method: 'post',
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      data: {
        "contents": [
          { "parts": [{ "text": text }] }
        ]
      },
    };

    const geminiResponse = await axios(generateContent);

    const resultText = geminiResponse.data.candidates[0].content.parts[0].text;
    return resultText;

  } catch (e) {
    console.error('Error getting:', e);
    throw e;
  }
};

module.exports = { sendMessageGeminie };
