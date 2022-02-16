require('dotenv').config()

const express = require('express')
require('./lib/database')
const UserController = require('./controllers/UserController')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())




app.post('/register', UserController.store)


app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})
    



