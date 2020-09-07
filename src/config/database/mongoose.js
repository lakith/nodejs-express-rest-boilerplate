const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const dbURL = 'mongodb+srv://lakith:linksyswith3com@umbrella-cluster.bwp5o.gcp.mongodb.net/task-manager-api?retryWrites=true&w=majority';

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
        console.log('Database Connected');
    } catch (error) {
        console.log('Database Connectivity Error', error);
        throw new Error(error);
    }
}