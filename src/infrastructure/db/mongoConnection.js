const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

class dbClient {
    constructor() {
        this.connect();
    }

    async connect() {
        const { DB_NAME, HOST_DB, PASSWORD_DB, USER_DB, PORT_DB } = process.env;
        const queryString = `mongodb://${USER_DB}:${PASSWORD_DB}@${HOST_DB}:${PORT_DB}/${DB_NAME}`;
        console.info(queryString);
        try {
            await mongoose.connect(queryString);
            console.info('Info: Connected to the local database');
        } catch (error) {
            console.error('Error: Unable to connect to the database', error);
        }
    }
}

module.exports = new dbClient();
