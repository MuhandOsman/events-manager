const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = {
	async store(req, res) {
		try {
			const { email, firstName, lastName, password } = req.body
			const existentUser = await User.findOne({ email })

			if (!existentUser) {
				const hashedPassword = await bcrypt.hash(password, 10)
				console.log(hashedPassword);
				const user = await User.create({
					email,
					firstName,
					lastName,
          			//password,
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
}

