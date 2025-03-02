const CharacterService = require('../../src/domain/services/CharacterService');
const CharacterRepositoryImplementation = require('../../src/infrastructure/repositories/CharacterRepositoryImplementation');

describe('CharacterService', () => {
    let characterService;
    let characterRepository;

    beforeEach(() => {
        characterRepository = new CharacterRepositoryImplementation();
        characterService = new CharacterService(characterRepository);
    });

    it('should filter out characters with deletedAt not null', async () => {
        const characters = [
            { id: 1, name: 'Character 1', ki: '100', maxKi: '1000', race: 'Saiyan', gender: 'Male', description: 'Description 1', image: 'Image 1', affiliation: 'One', deletedAt: null },
            { id: 2, name: 'Character 2', ki: '100', maxKi: '1000', race: 'Saiyan', gender: 'Female', description: 'Description 1', image: 'Image 1', affiliation: 'Two', deletedAt: '2023-01-01' },
            { id: 3, name: 'Character 3', ki: '100', maxKi: '1000', race: 'Saiyan', gender: 'Male', description: 'Description 1', image: 'Image 1', affiliation: 'Three', deletedAt: null },
        ];

        jest.spyOn(characterRepository, 'findAll').mockResolvedValue({ characters });

        const result = await characterService.getCharactersByFilters({});
        expect(result.characters).toEqual([
            { id: 1, name: 'Character 1', ki: '100', maxKi: '1000', race: 'Saiyan', gender: 'Male', description: 'Description 1', image: 'Image 1', affiliation: 'One', deletedAt: null },
            { id: 3, name: 'Character 3', ki: '100', maxKi: '1000', race: 'Saiyan', gender: 'Male', description: 'Description 1', image: 'Image 1', affiliation: 'Three', deletedAt: null },
        ]);
    });

    it('should handle errors when fetching characters', async () => {
        jest.spyOn(characterRepository, 'findAll').mockRejectedValue(new Error('Test error'));

        await expect(characterService.getCharactersByFilters({})).rejects.toThrow('Test error');
    });

});
