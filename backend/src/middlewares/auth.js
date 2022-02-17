const {verifyToken} = require('../lib/token');

const authentication = (req, res, next) => {
    const userToken = req.cookie.jwt;

    const tokenValid = verifyToken(userToken);
    if (tokenValid) {
        next();
    } else {
        console.error(tokenValid.error.message);
        res.status(401).end();
    }
}

module.exports = authentication;