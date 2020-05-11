/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const movieController = require('../src/controllers/MovieController');
const requestError = 'Ich kann aktuell leider nichts finden 🙁';

module.exports = function(controller) {

    controller.hears('Hallo','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'Hi, wie kann ich dir helfen?');
    });

    controller.hears(['Wie heißt du?'],'message,direct_message', async(bot, message) => {
        await bot.reply(message, '');
    });

    controller.hears(['nichts', 'nix'],'message,direct_message', async(bot, message) => {
        await bot.reply(message, 'Okay');
    });

    controller.hears('Danke','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'Gern geschehen');
    });

    controller.hears(['Wie geht\'s', 'Was läuft', 'Wie geht es dir'],'message,direct_message', async(bot, message) => {
        await bot.reply(message, 'Mir gehts super 🥰');
    });

    controller.hears(['genre', 'genres'],'message,direct_message', async(bot, message) => {
        try {
            const genres = await movieController.getMovieGenres();
            await bot.reply(message, String(`
                Ich hab folgende *Genres* gefunden: \n${genres.map(genre => genre.name).join(', ')}
            `));
        } catch (error) {
            await bot.reply(message, requestError);
        }
    });

    controller.hears('film','message,direct_message', async (bot, message) => {

        try {
            const { data } = await movieController.getRandomMovie(message.text);

            const { results } = data;
            const result = results[0];
            const { title, release_date: releaseDate, id } = result;
            const releaseYear = releaseDate.split('-')[0];

            await bot.reply(message, String(`
                Klar! Ich finde, du solltest dir *${title}* (${releaseYear}) anschauen 👀
            `));

            let summary = 'Ich konnte leider keine Zusammenfassung finden.';
            if (result.overview.length) {
                summary = String(`
                    Hier ist eine kurze Beschreibung des Films 🎥 \n${result.overview}.
                `);
            }
            await bot.reply(message, summary);
        } catch (error) {
            await bot.reply(message, requestError);
        }
    });

    controller.hears(['7'],'message,direct_message', async(bot, message) => {
        const random = Math.round(Math.random());
        await bot.reply(message, String(random));
    });

    controller.hears(new RegExp(/.+/s), 'message,direct_message', async(bot, message) => {
        await bot.reply(message, 'Kann ich noch was für dich tun?');
    });
}
