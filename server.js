const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config()
const PORT=process.env.PORT
const connectDB=require('./config/dbConnection')
connectDB()


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


