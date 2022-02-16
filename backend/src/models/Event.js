const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    toJSON: {
        virtuals: true
    }
});

// Virtuals are document properties that do not persist or get stored in the MongoDB database, they only exist logically and are not written to the document's collection.
EventSchema.virtual("thumbnail_url").get(function () { return `http://localhost:8000/files/${this.thumbnail}` })

module.exports = mongoose.model('Event', EventSchema)
