const {verifyToken} = require('../lib/token');


const authentication = (req, res, next) => {
    const userToken = req.cookies.jwt;
    //console.log("userToken" , userToken);
    const tokenValid = verifyToken(userToken);
       
    if (tokenValid.valid) {
        res.user = {
            userId: tokenValid.payload.userId
        }
        next();
    } else {
        console.error(tokenValid.error.message);
        res.status(401).send(tokenValid.error.message);
    }
}

module.exports = authentication;