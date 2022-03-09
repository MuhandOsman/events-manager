const Event = require('../models/Event');
const User = require('../models/User');

module.exports = {
    async createEvent(req, res) {
        const parsedForm = JSON.parse(req.body.eventForm)
        const { title, description, price , category, date, time } = parsedForm;
        
        // here i changed the user ID to be token from the cookie ...
        // const { user_id } = req.headers;
        const { user_id } = res.user.userId;
        console.log("req body in:" , title);
        const { filename } = req.file;

       /*  const user = await User.findById(user_id)

        if (!user) {
            return res.status(400).json({ message: 'User does not exist ! ' })
        } */

        const event = await Event.create({
            title : title,
            description,
            category,
            /* price: parseFloat(price) */
            price,
            date,
            time,
            user: user_id,
            // filename will have the original filename that have been uploaded to the server but we rename it over config/upload.js and will be used to store the image in the database
            thumbnail: filename
        })

        return res.json(event);
    },

    async delete(req, res) {
        const { eventId } = req.params;
        const userId = res.user.userId
        try {
            const currentEvent = await Event.findById(eventId);
            if (userId === currentEvent.user.toString()) {

                await Event.findByIdAndDelete(eventId)
                return res.status(204).end("event deleted")
            } else {
                res.status(403).send("you are not authorized to delete this event")
            }

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
            const currentEvent = await Event.findById(eventId);

            if (userId === currentEvent.user.toString()) {
                const updatedEvent = await Event.findOneAndUpdate({_id:eventId} , req.body , {new: true}); // new => will return the updated info not just update database
                const newEvent = await updatedEvent.save();
                res.status(200).json(newEvent)
            } else {
                res.status(403).send("not authorized")
            }

        } catch (error) {
            console.error(error);
        }
    }
}
