const mongoose = require('mongoose');

const PlanetReportSchema = new mongoose.Schema({
    planetId: { type: Number, required: true },
    name: { type: String, required: true },
    characters: { type: Array, default: [] },
});

const PlanetReportModel = mongoose.model('PlanetReport', PlanetReportSchema);

module.exports = PlanetReportModel;

