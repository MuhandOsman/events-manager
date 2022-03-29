const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    
    firstName: { 
        type: String,
        required: true
     },
    lastName: { 
        type: String,
        required: true
     },
    email: { 
         type: String,
         required: true,
         unique: true,
    },
    password: { 
        type: String,
        required: true
    },
    avatar: String,
    
},{
    toJSON: {
        virtuals: true
    }
})
UserSchema.virtual("avatar_url").get(function () { return `/files/${this.avatar}` })

module.exports=mongoose.model('User', UserSchema)



