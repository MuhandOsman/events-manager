const express = require('express')
const multer = require('multer')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const RegistrationController = require('./controllers/RegistrationController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')
const uploadConfig = require('./config/upload')

const authentication = require('./middlewares/auth')

const routes = express.Router();
const upload = multer(uploadConfig);


//Login Routes
routes.post('/login', LoginController.store)
routes.delete("/signout" , LoginController.signout)                   // need to be Done(done)

//Dashboard Routes
routes.get('/dashboard/:sport', DashboardController.getAllEvents)      // if we gonna search by category
routes.get('/dashboard', DashboardController.getAllEvents)
routes.get('/event/:eventId', DashboardController.getEventById)

//Events Routes
routes.post('/event', upload.single("thumbnail"),authentication , EventController.createEvent)    // to create event
routes.delete('/event/:eventId',authentication, EventController.delete)                          // to delete   
routes.patch("/event/:eventId" ,upload.single("thumbnail"),authentication, EventController.updateEvent)    //to update event


//Subscription-Registration Routes
routes.post('/registration/:eventId', RegistrationController.create)
routes.get('/registration/:registration_id', RegistrationController.getRegistration)
routes.post('/registration/:registration_id/approvals', ApprovalController.approval)
routes.post('/registration/:registration_id/rejections', RejectionController.rejection)

//User Routes
routes.post('/user/register', UserController.createUser)     // to register new user
routes.get('/user/:userId', UserController.getUserById)

//API Check Route
routes.get('/status', (req, res) => {
    res.send({ status: 200 })
})

module.exports = routes;
