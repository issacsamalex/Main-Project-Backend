const JWT = require('jsonwebtoken');


const authToken = async (req, res, next) => {
    const token = req.header("x-auth-token");
    if(!token){
        res.status(401).json({'message': 'Token not found'})
    }
    // Authenticate token
    try {
        const user = await JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user.username;
        next()
    } catch (error) {
        res.status(403).json({'message': 'Invalid token'})
    }
}


module.exports = authToken;