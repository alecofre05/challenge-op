const CharactersDTO = require('../dtos/CharactersDTO');

class CharacterController {
    constructor(characterService) {
        this.characterService = characterService;
    }

    async getCharacters(req, res) {
        try {
            const filters = req.query;
            console.debug('Debug: Received filters for getCharacters: ', filters);

            const characters = await this.characterService.getCharactersByFilters(filters);
            const charactersDTO = new CharactersDTO(characters.characters);

            console.info('Info: Sending response from characters with status 200');
            return res.status(200).json(charactersDTO);
        } catch (error) {
            console.error('Error in getCharacters:', error);
            res.status(500).json({ message: 'Error fetching characters', error: error.message });
        }
    }

}

module.exports = CharacterController;