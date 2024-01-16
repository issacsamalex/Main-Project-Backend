const JWT = require('jsonwebtoken');


const authToken = async (req, res, next) => {
    const token = req.headers.token;
    if(!token){
        res.status(401).json({'message': 'Token not found'})
    }
    // Authenticate token
    try {
        const payload = await JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!payload) throw 'Unauthorized'
        next()
    } catch (error) {
        res.status(403).json({'message': 'Invalid token'})
    }
}


module.exports = authToken;