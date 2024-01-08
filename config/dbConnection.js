const { MongoClient } = require('mongodb');
require('dotenv').config();

const URI = process.env.URI;

const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });


async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        const database = client.db('ProjectDB');
        console.log('Connected to database:', database.databaseName);

        return {
            client: client,
            database: database
        };
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        throw error; 
    }
}

module.exports = connectToMongoDB;
