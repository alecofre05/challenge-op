const PlanetReport = require("../entities/PlanetReport");

class PlanetService {
    constructor(planetRepository) {
        this.planetRepository = planetRepository;
    }

    async getPlanetReport(planetId) {
        let planetReport = await this.planetRepository.findById(planetId);

        if (!planetReport) {
            const planetData = await this.planetRepository.fetchFromAPI(planetId);
            if (!planetData) {
                throw new Error(`No information found for planet with ID: ${planetId}`);
            }

            planetReport = new PlanetReport({
                planetId: planetData.id,
                name: planetData.name,
                characters: planetData.characters,
            });

            planetReport = await this.planetRepository.save(planetReport);
        }

        return planetReport;
    }
}

module.exports = PlanetService;