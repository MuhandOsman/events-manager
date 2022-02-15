const express = require('express')
const mongoose = require('mongoose')
const UserController = require('./controllers/UserController')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

require('dotenv').config()

app.get('/', (req, res) => {
    //we need to delete the line below after testing
    console.log(req.body.firstName) 
	res.send('HELLO PEOPLE from server.js ')
})

app.get('/register', (req, res) => {
    //we need to delete the line below after testing
    console.log(req.body.email) 
	res.send('Welcome to creating a new User')
})

app.post('/register', UserController.store)

try {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	console.log('MongoDb connected successfully!')
} catch (error) {
	console.log(error)
}

// another way to connectting to mongoDB 
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     }).then(() => {
//         console.log('Connected to database successfully')
//     })
// .catch( (err) => {
//     console.error(err)
//     process.exit(1)
// })

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})
    



