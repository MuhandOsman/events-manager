const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

const options = { 
    algorithm: "HS256",
    
};

const signToken = (payload) => {
    return jwt.sign(payload,jwtSecret,options)
};

const verifyToken = (token) => {
    if (!token) {
        let error = new Error('you need to login');
        
        return {valid: false, error: error};
    }

    return jwt.verify(token, jwtSecret, (error, payload) => {
        if (error) return {valid: false, error: error};
        
        return {valid: true, payload: payload}
   }) 
}

module.exports = {
    signToken ,
    verifyToken
};