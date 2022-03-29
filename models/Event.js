const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    thumbnail: String,
    category: String,
    date: Date,
    location:String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subscribers: Array,
}, {
    toJSON: {
        virtuals: true
    }
});

// Virtuals are document properties that do not persist or get stored in the MongoDB database, they only exist logically and are not written to the document's collection.
EventSchema.virtual("thumbnail_url").get(function () { return `/files/${this.thumbnail}` })

module.exports = mongoose.model('Event', EventSchema)
