/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const apiService = require('../lib/ApiService.js');

const handleRandomMovieRequest = async (attempts = 1) => {
    try {
        return await apiService.getRandomMovie();
    } catch (error) {
        if (attempts <= 1) throw error;
        return await handleRandomMovieRequest(attempts - 1);
    }
}

module.exports = function(controller) {

    controller.hears('Hallo','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'Hi, wie kann ich dir helfen?');
    });

    controller.hears(['nichts', 'nix'],'message,direct_message', async(bot, message) => {
        await bot.reply(message, 'Okay');
    });

    controller.hears('Danke','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'Gern geschehen');
    });

    controller.hears('film','message,direct_message', async (bot, message) => {

        try {
            const { data } = await handleRandomMovieRequest(3);
            await bot.reply(message, String(`
                Klar! Ich finde, du solltest dir *${data.title}* anschauen 👀
            `));

            let summary = 'Ich konnte leider keine Zusammenfassung finden.';
            if (data.overview.length) {
                summary = String(`
                    Hier ist eine kurze Beschreibung des Films 🎥 \n${data.overview}.
                `);
            }
            await bot.reply(message, summary);
        } catch (error) {
            await bot.reply(message, 'Ich kann aktuell leider nichts finden 🙁');
        }
    });
}
