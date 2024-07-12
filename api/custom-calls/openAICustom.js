const OpenAI = require("openai");

const useDalle3 = async (prompt) => {

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        return response.data[0];
    } catch (err) {
        console.log(err.response.data)
        return "ERROR";
    }
};

const useDalle2 = async (prompt) => {

    try {

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: prompt,
            n: 1,
            size: "512x512",
        });

        return response.data[0];
    } catch (err) {
        console.log(err.message)
        return "ERROR Generating image";
    }
};

const completion = async (dataIn = '') => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: dataIn,
        max_tokens: 256,
        temperature: 0,
    });

    return response
}

const completionGTP4 = async (dataIn = '') => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: dataIn }],
        temperature: 0.2
    });

    return chatCompletion
}


module.exports = { useDalle3, useDalle2, completion, completionGTP4 };
