const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.MOVIES_API_URL;
const API_KEY = process.env.MOVIES_API_KEY;

class ApiService {
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

    getRandomMovie () {
        return this.getLatestMovie()
            .then(({ data }) => {
                const { id: maxId } = data;
                const randomId = Math.floor(
                    Math.random() * Math.floor(Number(maxId)));
                return this.getMovieById(randomId);
            });
    }
}

module.exports = new ApiService();