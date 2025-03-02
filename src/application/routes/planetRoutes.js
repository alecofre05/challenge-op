const express = require('express');
const router = express.Router();
const PlanetController = require('../controllers/PlanetController');
const PlanetService = require('../../domain/services/PlanetService');
const PlanetRepositoryImplementation = require('../../infrastructure/repositories/PlanetRepositoryImplementation');

const planetRepository = new PlanetRepositoryImplementation();
const planetService = new PlanetService(planetRepository);
const planetController = new PlanetController(planetService);

router.get('/:id', planetController.getPlanetReport.bind(planetController));

module.exports = router;