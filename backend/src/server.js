require('dotenv').config()
const express = require('express')
require('./lib/database')
const makeCookieParser = require('cookie-parser');

const cors = require('cors')

const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors());
app.use(makeCookieParser());
app.use(express.json());

app.use("/" , routes)





app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})
    



