const Character = require("./Character")

class Characters {
    constructor(characters) {
        this.characters = characters.map(character => {
            return new Character(character);
        });
    }

}

module.exports = Characters;