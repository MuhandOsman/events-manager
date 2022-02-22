const Event = require('../models/Event');
const User = require('../models/User');

module.exports = {
    async createEvent(req, res) {
        const { title, description, price , eventCategory } = req.body;
        const { user_id } = req.headers;
        /* const { filename } = req.file; */

        const user = await User.findById(user_id)

        if (!user) {
            return res.status(400).json({ message: 'User does not exist ! ' })
        }

        const event = await Event.create({
            title,
            description,
            eventCategory,
            price: parseFloat(price),
            user: user_id,
            // filename will have the original filename that have been uploaded to the server but we rename it over config/upload.js and will be used to store the image in the database
            /* thumbnail: filename */
        })

        return res.json(event);
    },

    async delete(req, res) {
        const { eventId } = req.params;
        try {
            await Event.findByIdAndDelete(eventId)
            return res.status(204).send()

        } catch (error) {
            return res.status(400).json({ message: 'We do not have any event with the ID' })
        }
    },

    // with the help of (auth) middleware any user send a request we have his Id under (res.user) 
    // now with auth we can allow update event only to the user who create the event ...
    async updateEvent (req, res) {
        const { eventId} = req.params;
        const userId = res.user.userId
        try {
            const currentEvent =Event.findById(eventId);
            if (userId === currentEvent.user) {
                
                const updatedEvent = await Event.findOneAndUpdate(eventId , req.body)
                await updatedEvent.save();
                res.status(200).json(updatedEvent)
            } else {
                res.status(403).send("not authorized")
            }

        } catch (error) {
            console.error(error);
        }
    }
}
