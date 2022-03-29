const bcrypt = require('bcrypt')
const User = require('../models/User')
const {signToken} = require("../lib/token")

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
				const payload = {email : user.email , userId : user._id ,ok: true};
                const token = signToken(payload);
                res.cookie("jwt",token);
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
		// console.log("user from backend", userId);
		try {
			const user = await User.findById(userId)   //changed from findOne
			 res.json(user)
		} catch (error) {
			return res.status(400).json({
				message:
				'User ID does not exist, do you want to register instead?',
				}) 
		}
	},
	async uploadPhoto(req, res) {
		const { filename } = req.file;
		const userId = res.user.userId
		
		try {
			const updateUser = await User.findById(userId)
			updateUser.avatar = filename
			const newUser = await updateUser.save()
			res.status(200).json(newUser)
		} catch (error) {
			console.error(error);	
		}
	}
}

