const PlanetReportDTO = require('../dtos/PlanetReportDTO');
const NotFoundError = require('../../domain/errors/Errors');

class PlanetController {
    constructor(planetService) {
        this.planetService = planetService;
    }

    async getPlanetReport(req, res) {
        try {
            const planetId = req.params.id;
            console.debug('Debug: Received id for getPlanetReport:', planetId);

            if (!planetId || isNaN(planetId)) {
                console.error('Error: Invalid planet ID provided:', planetId);
                return res.status(400).json({ message: 'Invalid planet ID provided' });
            }


            const planetReport = await this.planetService.getPlanetReport(Number(planetId));

            if (!planetReport) {
                console.info('Info: No report found for planetId:', planetId);
                return res.status(404).json({ message: 'Planet report not found' });
            }

            const planetReportDTO = new PlanetReportDTO(planetReport);

            console.info('Info: Sending planet report response with status 200 for planetId:', planetId);
            res.status(200).json(planetReportDTO);

        } catch (error) {
            console.error('Error fetching planet report:', error.message);

            if (error instanceof NotFoundError) {
                return res.status(404).json({ message: error.message });
            }

            res.status(500).json({
                message: 'Error fetching planet report',
                error: error.message || 'An unexpected error occurred',
            });
        }
    }


}

module.exports = PlanetController;