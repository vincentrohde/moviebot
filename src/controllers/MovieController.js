const apiService = require('../../lib/ApiService');

class MovieController {
    constructor () {
        this.genres = [];
    }

    async getRandomMovie (preferences) {
        try {
            const profile = await this.getMovieProfile(preferences);
            return await this.handleRandomMovieRequest(3, {
                ...profile
            });
        } catch (error) {
            throw error;
        }
    }

    async handleRandomMovieRequest (attempts = 1, params) {
        try {
            return await apiService.getRandomMovie(params);
        } catch (error) {
            if (attempts <= 1) throw error;
            return await this.handleRandomMovieRequest(attempts - 1, params);
        }
    }

    async getMovieGenres () {
        try {
            const { data } = await apiService.getMovieGenres();
            return data.genres;
        } catch (error) {
            throw error;
        }
    }

    async getMovieProfile (preferences) {
        let movieProfile = {};
        const words = preferences.toLowerCase().split(' ');
        const movieKeywordIndex = words.indexOf('film');
        const possibleGenre = movieKeywordIndex >= 1
            ? words[movieKeywordIndex - 1]
            : false;

        const isYear = preferences.replace(/\D/g, '');

        if (isYear) {
            movieProfile.year = isYear;
        }

        try {
            // set genres if haven't been set before
            if (!this.genres.length) {
                this.genres = await this.getMovieGenres();
            }

            if (this.genres.length && possibleGenre) {
                const foundGenres = this.genres.filter(genre => {
                    return genre.name.toLowerCase() === possibleGenre;
                });

                if (foundGenres.length) {
                    movieProfile.with_genres = foundGenres[0].id;
                }
            }

        } catch (error) {}

        return movieProfile;
    };
}

module.exports = new MovieController();