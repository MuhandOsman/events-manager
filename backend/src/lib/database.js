
require("dotenv").config();
const mongoose = require('mongoose')



/* try {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	console.log('MongoDb connected successfully!')
} catch (error) {
	console.error(error)
} */

// another way to connect to mongoDB 

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to database successfully')
    })
.catch( (err) => {
    console.error(err)
    process.exit(1)
})