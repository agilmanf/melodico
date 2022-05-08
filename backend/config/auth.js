const jwt = require('jsonwebtoken')
require('dotenv').config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const authenticateJWT = (req, res, next)=>{
    const authHeader = req.headers.authorization;
   
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, accessTokenSecret, (error, user) => {
            if (error) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = authenticateJWT;