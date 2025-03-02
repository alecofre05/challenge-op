const CharacterController = require('../../src/application/controllers/CharacterController');
const CharacterService = require('../../src/domain/services/CharacterService');
const CharacterRepositoryImplementation = require('../../src/infrastructure/repositories/CharacterRepositoryImplementation');

describe('CharacterController', () => {
    let characterController;
    let characterService;
    let req;
    let res;

    beforeEach(() => {
        characterRepository = new CharacterRepositoryImplementation();
        characterService = new CharacterService(characterRepository);
        characterController = new CharacterController(characterService);

        req = {
            query: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should return filtered characters', async () => {
        const characters = [
            { id: 1, name: 'Character 1', ki: '100', maxKi: '1000', race: 'Saiyan', gender: 'Male', description: 'Description 1', image: 'Image 1', affiliation: 'One', deletedAt: null },
            { id: 2, name: 'Character 2', ki: '100', maxKi: '1000', race: 'Saiyan', gender: 'Female', description: 'Description 1', image: 'Image 1', affiliation: 'Two', deletedAt: null },
            { id: 3, name: 'Character 3', ki: '100', maxKi: '1000', race: 'Saiyan', gender: 'Male', description: 'Description 1', image: 'Image 1', affiliation: 'Three', deletedAt: null },
        ];

        jest.spyOn(characterService, 'getCharactersByFilters').mockResolvedValue({ characters });

        await characterController.getCharacters(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            characters: [
                { id: 1, name: 'Character 1', ki: '100', maxKi: '1000', race: 'Saiyan', gender: 'Male', description: 'Description 1', image: 'Image 1', affiliation: 'One' },
                { id: 2, name: 'Character 2', ki: '100', maxKi: '1000', race: 'Saiyan', gender: 'Female', description: 'Description 1', image: 'Image 1', affiliation: 'Two' },
                { id: 3, name: 'Character 3', ki: '100', maxKi: '1000', race: 'Saiyan', gender: 'Male', description: 'Description 1', image: 'Image 1', affiliation: 'Three' }
            ]
        });
    });


    it('should return 500 if an error occurs', async () => {
        jest.spyOn(characterService, 'getCharactersByFilters').mockRejectedValue(new Error('Database error'));

        await characterController.getCharacters(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error fetching characters',
            error: 'Database error'
        });
    });
});

