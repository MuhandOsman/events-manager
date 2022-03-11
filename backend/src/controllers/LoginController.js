const bcrypt = require('bcrypt')
const User = require('../models/User');
const {signToken} = require('../lib/token')

module.exports = {
    async store(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(405).json( {message :"Required field missing!"} ) 
                
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(403).json( {message :"incorrect infos"})
            }

            
            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                return res.status(401).json({message:"could not login!"})
            } else {

                const payload = {email : user.email , userId : user._id ,ok: true};
                const token = signToken(payload);
                res.cookie("jwt",token);
                return res.status(200).send(payload)
                // return res.status(204).end()
            }

        } catch (error) {
             throw Error(`Error while Authenticating a User ${error}`) 
            
        }
    }
    //  this one to delete the token and sign user out
    ,
     signout (req, res)  {
        res.clearCookie('jwt');
        res.status(200).send('cookie jwt deleted');
    }
}