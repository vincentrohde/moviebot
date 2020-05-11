const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.MOVIES_API_URL;
const API_KEY = process.env.MOVIES_API_KEY;

class ApiService {
    getMovieList (params = {}) {
        return axios.get(API_URL + '/discover/movie', {
            params: {
                api_key: API_KEY,
                include_adult: 'false',
                ...params
            }
        });
    }

    getMovieGenres () {
        return axios.get(API_URL + '/genre/movie/list', {
            params: {
                api_key: API_KEY,
            }
        });
    }

    getLatestMovie () {
        return axios.get(API_URL + '/movie/latest', {
            params: {
                api_key: API_KEY
            }
        });
    }

    getMovieById (id) {
        return axios.get(API_URL + '/movie/' + id, {
            params: {
                api_key: API_KEY,
                include_adult: 'false'
            }
        });
    }

    getRandomMovie (params = {}) {
        return this.getMovieList(params)
            .then(({ data }) => {
                const { total_pages } = data;
                const randomPage = Math.floor(
                    Math.random() * Math.floor(Number(total_pages))
                );
                return this.getMovieList({
                    page: randomPage,
                    ...params
                });
            });
    }
}

module.exports = new ApiService();