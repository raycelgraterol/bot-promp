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

const completion = async (dataIn = '') => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: dataIn,
        max_tokens: 256,
        temperature: 0,
    });

    return response
}

const completionGTP4 = async (dataIn = '') => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{ role: "user", content: dataIn }],
        temperature: 0.2
    });

    return chatCompletion
}


module.exports = { useDalle3, useDalle2, completion, completionGTP4 };
