class CharactersDTO {
    constructor(characters) {
        this.characters = characters.map(character => {
            return new CharacterDTO(character)
        });
    }
}

class CharacterDTO {
    constructor({ id, name, ki, maxKi, race, gender, description, image, affiliation }) {
        this.id = id;
        this.name = name;
        this.ki = ki;
        this.maxKi = maxKi;
        this.race = race;
        this.gender = gender;
        this.description = description;
        this.image = image;
        this.affiliation = affiliation;
    }
}

module.exports = CharactersDTO;