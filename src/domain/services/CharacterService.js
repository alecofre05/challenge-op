class CharacterService {
    constructor(characterRepository) {
        this.characterRepository = characterRepository;
    }

    async getCharactersByFilters(filters) {
        let characters = await this.characterRepository.findAll(filters);
        characters = characters.characters.filter(character => character.deletedAt === null);

        return { characters };
    }
}

module.exports = CharacterService;