const logger = require('../logger/logger')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const dbURL = process.env.DB_URL;

// refere this link for more details - https://mongoosejs.com/docs/connections.html
module.exports = async () => {
    try {
        await mongoose.connect(dbURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            ssl: true,
            sslValidate: true,
        })
        logger.info('Database Connected');
    } catch (error) {
        logger.error('Database Connectivity Error', error);
        throw new Error(error);
    }
}