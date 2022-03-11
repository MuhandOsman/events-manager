const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = {
	async createUser(req, res) {
		try {
			const { email, firstName, lastName, password } = req.body
			if (!email || !password || !firstName || !lastName) {
                return res.status(405).json( {message :"Required field missing!"} )
            }
			const existentUser = await User.findOne({ email })

			if (!existentUser) {
				const hashedPassword = await bcrypt.hash(password, 10)
				
				const user = await User.create({
					email,
					firstName,
					lastName,
					password: hashedPassword,
				})
				return res.json(user)
			}
			return res.status(400).json({
				message:
          'email already exist!  do you want to login instead? ',
			})
		} catch (err) {
			throw Error(`Error while Registering new user :  ${err}`)
		}
	},
	async getUserById(req , res) {
		//const userId = req.params.userId
		const {userId} = req.params
		console.log(userId);
		try {
			const user = await User.findOne({ userId })
			 res.json(user)
		} catch (error) {
			return res.status(400).json({
				message:
				'User ID does not exist, do you want to register instead?',
				}) 
		}
	}
}

