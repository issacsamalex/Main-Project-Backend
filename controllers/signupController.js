const User = require('../model/Student_details');
const Grade = require('../model/Student_grades');
const bcrypt = require('bcrypt');


const getAllUsers = async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
}


const createNewUser = async (req, res) => {
    const { username, email, password} = req.body

    // Confirm data
    if(!username || !password || !email){
        return res.status(400).json({message: 'All fields are required'})
    };

     // Check if the student's email exists in the student_gardes collection
     const exitExamResult = await Grade.findOne({studentemail: email});
     if(!exitExamResult || exitExamResult.marksobtained < 40){
        // If the student's email is not found or marks are below pass criteria
        return res.status(400).json({ message: 'You did not meet the pass criteria in the exit exam'})
     };

    // Check for duplicate username
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    };

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPwd, email}

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    };
}


module.exports = {
    getAllUsers,
    createNewUser
}