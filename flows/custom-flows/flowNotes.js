const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { handlerAI } = require("../../utils/utils");

const flowNotaDeVoz = addKeyword(EVENTS.VOICE_NOTE)
    .addAction(async (ctx, ctxFn) => {
        
        console.log(`[Flow Smart VoiceNote]`)
        //const employeesAddon = ctxFn.extensions.employeesAddon
        
        await ctxFn.flowDynamic("dame un momento para escucharte...🙉");
        const text = await handlerAI(ctx);
        console.log(text)

        //const currentState = ctxFn.state.getMyState();
        // const fullSentence = `${currentState?.answer ?? ""}. ${text}`;
        // const { employee, answer } = await employeesAddon.determine(fullSentence);
        // ctxFn.state.update({ answer });
        // if (employee) employeesAddon.gotoFlow(employee, ctxFn);
        // if (!employee) ctxFn.gotoFlow(notEmployee);
    });

module.exports = flowNotaDeVoz;