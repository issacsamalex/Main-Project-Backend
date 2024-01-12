require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/dbConnection');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const projectRoutes = require('./routes/projectRoutes');





const PORT = process.env.PORT

// Connect to MongoDB
const newConnectDB = async () => {
    try {
        await connectDB();
    } catch (error) {
        console.log(error)
    }
}


// Cross Origin Resource Sharing
app.use(cors())

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());

//middlewares
app.use(bodyParser.json());

//Routes
app.use('/api/v1/auth', signupRoutes);
app.use('/api/v1/auth', loginRoutes);

app.use('/api/v1/dash/student_dash', projectRoutes);



newConnectDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
})


