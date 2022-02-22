const bcrypt = require('bcrypt')
const User = require('../models/User');
const {signToken} = require('../lib/token')

module.exports = {
    async store(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(200).json({ message: "Required field missing!" })
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "incorrect infos" })
            }

            /* if (user && await bcrypt.compare(password, user.password)) {
                const userResponse = {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
                return res.json(userResponse)
            } else {
                return res.status(401).json({ message: "Email or Password does not match!" })
            }
        */
            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                return res.status(401).json("could not login!")
            } else {

                const payload = {email : user.email , userId : user._id};
                const token = signToken(payload);
                res.cookie("jwt",token);
                return res.status(200).json(token)
            }

        } catch (error) {
            throw Error(`Error while Authenticating a User ${error}`)
        }
    }
    //  this one to delete the token and sign user out
    // ,
    //  signout (req, res)  {
    //     res.clearCookie('jwt');
    //     res.status(200).send('cookie jwt deleted');
    // }
}