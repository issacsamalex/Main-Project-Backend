const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
app.use(cors())
require('dotenv').config()
const PORT = process.env.PORT
const connectToMongoDB = require('./config/dbConnection')
const projectDetails = require('./model/Project')
connectToMongoDB()

app.use('/projects', projectDetails);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


