const User = require('../model/Student_details');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        User.findOne({ username }).then((user) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err || !result) return res.status(401).send(err || "wrong password")
                const accessToken = JWT.sign({ userId: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET);
                const userID = user._id
                const projectID = user.project_id
                return res.status(201).send({ accessToken, userID, projectID })
            })
        })
            .catch(err => {
                return res.status(404).send('cannot find user')
            })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    handleLogin
}