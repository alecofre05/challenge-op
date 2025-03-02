class PlanetReport {
    constructor({ planetId, name, characters = [] }) {
        this.planetId = planetId;
        this.name = name;
        this.characters = characters;
    }
}

module.exports = PlanetReport;

