const { Configuration, OpenAIApi } = require("openai");

const useDalle3 = async (prompt) => {

    try {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const response = await openai.createImage({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        return response.data.data[0];
    } catch (err) {
        console.log(err.response.data)
        return "ERROR";
    }
};

const useDalle2 = async (prompt) => {

    try {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const response = await openai.createImage({
            model: "dall-e-2",
            prompt: prompt,
            n: 1,
            size: "512x512",
        });

        return response.data.data[0];
    } catch (err) {
        console.log(err.response.data)
        return "ERROR";
    }
};

module.exports = { useDalle3, useDalle2 };
