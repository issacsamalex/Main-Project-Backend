const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../config/dbConnection');


router.get('/', async (req, res) => {
    try {
        const { client, database } = await connectToMongoDB();
        const collection = database.collection('projectDetails');
        const projectDetails = await collection.find({}).toArray();
        res.json(projectDetails);
    } catch (error) {
        console.error('Error retrieving data from MongoDB Atlas:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
