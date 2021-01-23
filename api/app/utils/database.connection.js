const mysql = require('promise-mysql');

class DBConnection {
    constructor() {
        this.connection = null;
        this.createConnection = this.createConnection.bind(this);
        this.closeConnection = this.closeConnection.bind(this);
    }

    async createConnection(options) {
        const configuration = {
            user: process.env.DB_USERNAME,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            ...options
        };

        try {
            const pool = await mysql.createPool(configuration);
            return pool;
        } catch (ex) {
            console.error(`Error connection : ${ex.message}`);
            throw ex;
        }
    }

    async closeConnection(connection) {
        try {
            await connection.end();
        } catch (ex) {
            console.error(ex.message);
            throw ex;
        }
    }
}

module.exports = DBConnection;