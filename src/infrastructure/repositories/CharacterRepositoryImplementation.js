const DragonBallAPI = require('../api/DragonBallAPI');
const CharacterRepository = require('../../domain/repositories/CharacterRepository');
const Characters = require('../../domain/entities/Characters');

class CharacterRepositoryImplementation extends CharacterRepository {
    constructor() {
        super();
        this.apiClient = new DragonBallAPI();
    }

    async findAll(filters) {
        console.debug('Debug: Requesting characters from the API');

        const characters = await this.apiClient.getCharacters(filters);
        return new Characters(characters);
    }
}

module.exports = CharacterRepositoryImplementation;