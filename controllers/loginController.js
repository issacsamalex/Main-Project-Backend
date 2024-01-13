const User = require('../model/Student_details');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');


const handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        User.findOne({username}).then((user)=>{
            bcrypt.compare(password, user.password, (err, result)=>{
                if(err || !result) return res.status(401).send(err || "wrong password")
                const accessToken = JWT.sign({ username }, process.env.ACCESS_TOKEN_SECRET);
                const userID = user._id
                return res.status(201).send({accessToken, userID})
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