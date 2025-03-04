const axios = require('axios');
const dotenv = require('dotenv');
const NotFoundError = require('../../domain/errors/Errors');
dotenv.config();

class DragonBallAPI {
    constructor() {
        this.client = axios.create({
            baseURL: process.env.DRAGONBALL_API_URL,
            timeout: 5000,
        });
    }

    async getCharacters(filters = {}) {
        try {
            console.debug('Debug: Preparing to fetch characters with filters:', filters);

            const url = '/characters';
            const response = await this.client.get(url, { params: filters });

            if (response.data.items) {
                return response.data.items;
            }

            console.info('Info: Successfully fetched characters.');
            return response.data;
        } catch (error) {
            console.error('Error fetching characters from Dragon Ball API:', error.message);
            throw error;
        }
    }


    async getPlanet(planetId) {
        try {
            console.debug('Debug: Preparing to fetch planet with id:', planetId);

            const response = await this.client.get(`/planets/${planetId}`);

            console.info('Info: Successfully fetched planet data for planetId:', planetId);
            return response.data;
        } catch (error) {
            console.error('Error fetching planet from Dragon Ball API:', error);
            if (error.response) {
                const { status } = error.response;

                switch (status) {
                    case 400:
                        // API responds 400 when the planet is not found
                        throw new NotFoundError('Planet not found');
                    case 404:
                        throw new NotFoundError('Planet not found');
                }
            }

            throw error;
        }
    }
}

module.exports = DragonBallAPI;