const express = require('express')
const multer = require('multer')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const uploadConfig = require('./config/upload')

const routes = express.Router();
const upload = multer(uploadConfig);


//Login Routes
routes.post('/login', LoginController.store)

//Dashboard Routes
routes.get('/dashboard/:sport', DashboardController.getAllEvents)
routes.get('/dashboard', DashboardController.getAllEvents)
routes.get('/event/:eventId', DashboardController.getEventById)

//Events Routes
routes.post('/event', upload.single("thumbnail"), EventController.createEvent)
routes.delete('/event/:eventId', EventController.delete)

//User Routes
routes.post('/user/register', UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)

//API Check
routes.get('/status', (req, res) => {
    res.send({ status: 200 })
})

module.exports = routes;
