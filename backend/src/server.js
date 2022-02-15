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
    

app.get("/", (req, res) => {
    console.log(req.body.firstName)
    res.send("HELLO PEOPLE")
})

app.post("/", (req, res) => {
    console.log(req.body.email)
    res.send("Welcome to creating a new User")
})


app.listen(PORT, function(){
    console.log (`listening on ${PORT}`)
})


