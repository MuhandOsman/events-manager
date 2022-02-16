require ("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")

const cors = require("cors")
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors())


try {
    mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    console.log('MongoDb connected successfully!')
    } catch (error) {
    console.log(error)
    }
    

    

app.post('/register', UserController.store)

app.listen(PORT, function(){
    console.log (`listening on ${PORT}`)
})


