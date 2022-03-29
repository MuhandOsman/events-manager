const Event = require('../models/Event');

module.exports = {
    async getEventById(req, res) {
        const { eventId } = req.params;
        try {
            const event = await Event.findById(eventId)

            if (event) {
                return res.json(event)
            }
        } catch (error) {
            return res.status(400).json({ message: 'EventId does not exist !!!' })
        }
    },
    async getAllEvents(req, res) {
        const { eventCategory } = req.params;
        const query = { eventCategory } || "";
        // I deleted query from Event.find => its is the only way to show all events
        try {
            const events = await Event.find()

            if (events) {
                return res.json(events)
            }
        } catch (error) {
            return res.status(400).json({ message: 'There is no any Events yet' })
        }
    }
}