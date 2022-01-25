const Event = require('../models/event');

exports.insertEvent = ( req, res ) => {
    if(!req.body.event.userId){
        return res.status(400).json('משתמש לא זוהה');
    } else if(!req.body.event.businessId) {
        return res.status(400).json('עסק לא זוהה');
    } else if(!req.body.event.unitId) {
        return res.status(400).json('יחידה לא זוהתה');
    }

    const title = req.body.event.title;
    const start = req.body.event.startStr;
    const end = req.body.event.endStr;
    const unitId = req.body.event.unitId;
    const businessId = req.body.event.businessId;
    const userId = req.body.event.userId;
    const startDate = req.body.event.startDate;
    const endDate = req.body.event.endDate;

    const event = new Event({ title, start, end, unitId, businessId, startDate, endDate, userId});
    event.save((err, event) => {
        if (err) {
            return res.status(400).json({err:err});
        }
        return res.json( event);
    })
};

exports.loadEvents = ( req, res ) => {
    Event.find({unitId: req.body.unitId}, (err,events) => {
        if (err || !events){
            return res.status(400).json('לא נמצאו אירועים.');
        }
        return res.json(events);
    })
};

exports.loadUserEvents = (req, res) => {
    Event.find({userId: req.body.id}, (err,events) => {
        if (err || !events){
            return res.status(400).json('לא נמצאו אירועים.');
        }
        return res.json(events);
    })
};

exports.editEvent = (req, res) => {
    const id = req.body.event.idToEdit;
    Event.findByIdAndUpdate(id, {start: req.body.event.startStr, end: req.body.event.endStr, title: req.body.event.title, startDate: req.body.event.startDate, endDate:req.body.event.endDate}, {new: true}, (err, event) => {
        if (err) {
            return res.status(400).json({err:err});
        }
        if(!event) {
            return res.status(400).json('אירוע לא נמצא!');
        }
        return res.json(event);
    });
};

exports.deleteEvent = (req, res) => {
    Event.deleteOne({ _id: req.body.id }, (err) =>{
        if (err){
            return res.status(400).json(err);
        }
        return res.status(200).json({id: req.body.id});
    });
};