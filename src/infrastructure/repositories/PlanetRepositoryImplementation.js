const PlanetReportModel = require('../db/models/PlanetReportModel');
const DragonBallAPI = require('../api/DragonBallAPI');
const PlanetRepository = require('../../domain/repositories/PlanetRepository');
const PlanetReport = require('../../domain/entities/PlanetReport');

class PlanetRepositoryImplementation extends PlanetRepository {
    constructor() {
        super();
        this.apiClient = new DragonBallAPI();
    }

    async findById(planetId) {
        console.debug('Debug: Searching for the planet in the DB');
        return await PlanetReportModel.findOne({ planetId });
    }

    async save(planetReport) {
        try {
            console.debug('Debug: Saving planet information in the DB');
            const report = new PlanetReportModel(planetReport);
            const savedReport = await report.save();
            console.info('Info: planet report saved successfully');
            return new PlanetReport(savedReport.toObject());
        } catch (error) {
            console.error(`Error saving planet report: ${error.message}`);
            throw error;
        }
    }

    async fetchFromAPI(planetId) {
        console.debug('Debug: Requesting a planet from the API');
        return await this.apiClient.getPlanet(planetId);
    }
}

module.exports = PlanetRepositoryImplementation;