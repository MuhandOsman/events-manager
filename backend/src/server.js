require('dotenv').config()

const express = require('express')
require('./lib/database')
const UserController = require('./controllers/UserController')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())


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


app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})
    



