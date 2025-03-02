const PlanetController = require('../../src/application/controllers/PlanetController');
const PlanetService = require('../../src/domain/services/PlanetService');
const PlanetRepositoryImplementation = require('../../src/infrastructure/repositories/PlanetRepositoryImplementation');

describe('PlanetController', () => {
    let planetService;
    let planetRepository;
    let planetController;
    let req;
    let res;

    beforeEach(() => {
        planetRepository = new PlanetRepositoryImplementation();
        planetService = new PlanetService(planetRepository);
        planetController = new PlanetController(planetService);

        req = {
            params: {},
            query: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should return planet report', async () => {
        const planetData = { planetId: 1, name: 'Namek', characters: [] };

        jest.spyOn(planetService, 'getPlanetReport').mockResolvedValue(planetData);

        req.params.id = '1';

        await planetController.getPlanetReport(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            id: 1,
            name: 'Namek',
            affiliationReport: []
        });
    });

    it('should return 400 if planetId is missing', async () => {
        await planetController.getPlanetReport(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid planet ID provided' });
    });

    it('should return 400 if planetId is not a number', async () => {
        req.params.id = 'abc';

        await planetController.getPlanetReport(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid planet ID provided' });
    });

    it('should return 404 if planet report does not exist', async () => {
        req.params.id = '2';

        jest.spyOn(planetService, 'getPlanetReport').mockResolvedValue(null);

        await planetController.getPlanetReport(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Planet report not found' });
    });

    it('should return 500 if an error occurs', async () => {
        req.params.id = '3';

        jest.spyOn(planetService, 'getPlanetReport').mockRejectedValue(new Error('Database connection failed'));

        await planetController.getPlanetReport(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error fetching planet report',
            error: 'Database connection failed'
        });
    });

});
