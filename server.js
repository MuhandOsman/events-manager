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
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/files",express.static("files"))
app.use(require('./middlewares/logger'))
app.use("/api" , routes)


// We can serve our built frontend via express with express.static.
app.use("/app", express.static("./app"));
// By adding the following line, we make sure that whenever we try to access a subpage of our frontend directly
// we serve index.html instead, which then handles the request with react router.
app.use("/app/*", (req, res) => {
	res.sendFile(__dirname + "/app/index.html")
	console.log(__dirname);
});


app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})
