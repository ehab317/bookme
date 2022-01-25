const Business = require('../models/business');

exports.loadBusinesses = (req, res) => {
    Business.find({userID: req.body.id}, (err,businesses) => {
        if (err || !businesses){
            return res.status(400).json('לא נמצאו עסקים. להוספת העסק הראשון שלך, לחץ על הוסף חדש');
        }
        return res.json({businesses: businesses});
    })
}

exports.insertBusinesses = (req, res) => {

    if(!req.body.business.name){
        return res.status(400).json('חובה להזין שם עסק');
    } else if(!req.body.business.userID) {
        return res.status(400).json('משתמש לא זוהה');
    }
    const business = new Business(req.body.business);
    business.save((err, business) => {
        if (err) {
            return res.status(400).json({err:err})
        }
        return res.json( business);
    })
};

exports.deleteBusinesses = (req, res) => {
    Business.deleteOne({ _id: req.body.id }, (err) => {
        if (err) {
            return res.status(400).json({err});
        } else {
            return res.status(200).json({_id : req.body.id});
        }
    });
}