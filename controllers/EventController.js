const Event = require('../models/Event');
const User = require('../models/User');

module.exports = {
    async createEvent(req, res) {
        const parsedForm = JSON.parse(req.body.eventForm)
        const { title, description, price , category, date,location } = parsedForm;
        
        // here i changed the user ID to be token from the cookie ...
        // const { user_id } = req.headers;
        const { userId } = res.user;
            
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
            user: userId,
            // filename will have the original filename that have been uploaded to the server but we rename it over config/upload.js and will be used to store the image in the database
            thumbnail: filename,
            location
        })

        return res.json(event);
    },

    async delete(req, res) {
        const { eventId} = req.params;
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
        const parsedForm = JSON.parse(req.body.updateEvent)
        //const { title, description, price , category, date,location } = parsedForm; => we may not need that to update only a part
        const { eventId} = req.params;
        const userId = res.user.userId
                
        try {
            const currentEvent = await Event.findById(eventId);
            if(req.file) {
                const { filename } = req.file;
                parsedForm.thumbnail = filename
            }
            

            if (userId === currentEvent.user.toString()) {
                const updatedEvent = await Event.findOneAndUpdate({_id:eventId} , parsedForm , {new: true}); // new => will return the updated info not just update database
                const newEvent = await updatedEvent.save();
                res.status(200).json(newEvent)
            } else {
                res.status(403).send("not authorized")
            }

        } catch (error) {
            console.error(error);
        }
    } ,
    async   addSubscriber (req, res) {
        
        const { eventId} = req.params;
        
        try {
            
            const currentEvent = await Event.findById(eventId);
            if ( !currentEvent) { 
            res.status(404).json("Event not found ")
            }
            const userId = res.user.userId || null;

            if (!userId ) { 
                return res.status(400).json("please log in");
            } 
            if (currentEvent.subscribers.includes(userId)) { // I want here to stop user from registering twice ...
               return res.status(400).json({ message : "you are already registered !"})
            }
            

            currentEvent.subscribers.push(userId);  
            const newEvent = await currentEvent.save();
            return res.status(200).json(newEvent)

        } catch (error) {
            console.error(error.message);
        }
    } ,
    async getEventByUserId(req, res) {
        try {
            const {userId} = req.params
            //const userId = req.user.userId;
        const createdEvents = await Event.find({user :userId})
        res.send(createdEvents)
        } catch (error) {
            console.log(error);
        }
        
    },
    async getRegistrationUserId(req, res) {
        try {
            const {userId} = req.params
            
            //const userId = req.user.userId;
        const createdEvents = await Event.find({subscribers:{$elemMatch :{$eq:userId}}})
        res.send(createdEvents)
        } catch (error) {
            console.log(error);
        }
        
    },
    async unsubscribe(req, res) {
        const { eventId} = req.params;
        const userId = res.user.userId
        
        try {
            const targetEvent = await Event.findById(eventId)
            const evIndex = targetEvent.subscribers.indexOf(userId)
            const cloneSub = [...targetEvent.subscribers]
             cloneSub.splice(evIndex,1)
            
            const newEvent = await Event.findByIdAndUpdate({_id:eventId},{subscribers:cloneSub} , {new: true})
            res.status(201).json({message: "unsubscribed successfully" })
        } catch (error) {
            console.error(error)
        }
    }
}