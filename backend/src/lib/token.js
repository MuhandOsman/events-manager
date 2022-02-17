const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

const options = { 
    algorithm: "HS256",
    expiresIn: '1h',
};

const signToken = (payload) => {
    return jwt.sign(payload,jwtSecret,options)
};

const verifyToken = (token) => {
    if (!token) {
        let error = new Error('token not provided');
        console.error('error: ', error.message);
        return {valid: false, error: error};
    }

    return jwt.verify(token, secret, (error, payload) => {
        if (error) return {valid: false, error: error};
        
        return {valid: true, payload: payload}
   }) 
}

module.exports = {
    signToken ,
    verifyToken
};