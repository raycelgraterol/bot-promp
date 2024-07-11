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

const geminiVision = async (imageBase64) => {
  try {
    const generateContent = {
      method: 'post',
      url: `https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent?key=${process.env.GEMINI_API_KEY}`,
      data: {
        "contents": [
          {
            "parts": [
              {
                "text": "Describe esta imagen en detalle. Mostrar resultado de texto en español."
              },
              {
                "inlineData": {
                  "mimeType": "image/jpeg",
                  "data": imageBase64
                }
              }
            ]
          }
        ],
        "generationConfig": {
          "temperature": 0.4,
          "topK": 32,
          "topP": 1,
          "maxOutputTokens": 4096,
          "stopSequences": []
        },
        "safetySettings": [
          {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      },
    };

    const geminiResponse = await axios(generateContent);

    const resultText = geminiResponse.data.candidates[0].content.parts[0].text;
    return resultText;

  } catch (e) {
    console.error('Error getting:', e);
    return "No puedo procesar esta imagen, intenga alguna otra diferente."
  }
};



module.exports = { sendMessageGeminie, geminiVision };


