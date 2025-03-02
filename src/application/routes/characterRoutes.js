const express = require('express');
const router = express.Router();
const CharacterController = require('../controllers/CharacterController');
const CharacterService = require('../../domain/services/CharacterService');
const CharacterRepositoryImplementation = require('../../infrastructure/repositories/CharacterRepositoryImplementation');

const characterRepository = new CharacterRepositoryImplementation();
const characterService = new CharacterService(characterRepository);
const characterController = new CharacterController(characterService);

router.get('/', characterController.getCharacters.bind(characterController));

module.exports = router;