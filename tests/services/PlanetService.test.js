const PlanetService = require('../../src/domain/services/PlanetService');
const PlanetRepositoryImplementation = require('../../src/infrastructure/repositories/PlanetRepositoryImplementation');

describe('PlanetService', () => {
    let planetService;
    let planetRepository;

    beforeEach(() => {
        planetRepository = new PlanetRepositoryImplementation();
        planetService = new PlanetService(planetRepository);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should search for planets from an id', async () => {
        const planet = { planetId: 1, name: 'Namek', characters: [] };
        jest.spyOn(planetRepository, 'findById').mockResolvedValue(planet);

        const result = await planetService.getPlanetReport(1);

        expect(planetRepository.findById).toHaveBeenCalledWith(1);
        expect(result).toEqual(planet);
    });

    it('should fetch from API and save if not found in repository', async () => {
        const planetData = { id: 2, name: 'Tierra', characters: [] };

        jest.spyOn(planetRepository, 'findById').mockResolvedValue(null);
        jest.spyOn(planetRepository, 'fetchFromAPI').mockResolvedValue(planetData);
        jest.spyOn(planetRepository, 'save').mockResolvedValue(planetData);

        const result = await planetService.getPlanetReport(2);

        expect(planetRepository.fetchFromAPI).toHaveBeenCalledWith(2);
        expect(planetRepository.save).toHaveBeenCalledWith(expect.objectContaining({
            planetId: planetData.id,
            name: planetData.name,
            characters: planetData.characters
        }));
        expect(result).toEqual(planetData);
    });

    it('should throw an error if planet is not found in repository or API', async () => {
        jest.spyOn(planetRepository, 'findById').mockResolvedValue(null);
        jest.spyOn(planetRepository, 'fetchFromAPI').mockResolvedValue(null);

        await expect(planetService.getPlanetReport(3))
            .rejects
            .toThrow('No information found for planet with ID: 3');

        expect(planetRepository.fetchFromAPI).toHaveBeenCalledWith(3);
    });
});
