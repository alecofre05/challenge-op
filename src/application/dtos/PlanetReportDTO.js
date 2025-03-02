class PlanetReportDTO {
    constructor(planetReport) {
        this.id = planetReport.planetId;
        this.name = planetReport.name;
        this.affiliationReport = this.getAffiliationReport(planetReport.characters);
    }

    getAffiliationReport(characters) {
        const affiliationMap = {};

        characters.forEach(character => {
            const affiliation = character.affiliation || "Unknown";
            const kiValue = this.parseKi(character.ki);

            if (!affiliationMap[affiliation]) {
                affiliationMap[affiliation] = [];
            }

            affiliationMap[affiliation].push({
                id: character.id,
                name: character.name,
                ki: character.ki,
                race: character.race,
                image: character.image
            });
        });

        return Object.entries(affiliationMap).map(([affiliation, characters]) => ({
            affiliation,
            characters: characters.sort((a, b) => this.parseKi(b.ki) - this.parseKi(a.ki))
        }));
    }

    parseKi(ki) {
        return Number(ki.replace(/\D/g, "")) || 0;
    }
}

module.exports = PlanetReportDTO;
