const Units = require('../models/units');

exports.loadUnits = (req, res) => {
    Units.find({userID: req.body.id}, (err,units) => {
        if (err || !units){
            return res.status(400).json('לא נמצאו יחידות למשתמש זה');
        }
        return res.json({units: units});
    })
};

exports.loadBusinessUnits = (req, res) => {
    Units.find({businessId: req.body.businessID}, (err,units) => {
        if (err || !units){
            return res.status(400).json('לא נמצאו יחידות!');
        }
        return res.json({units: units});
})}

exports.insertUnit = (req, res) => {
    console.log(req.body);
    if(!req.body.unit.name){
        return res.status(400).json('חובה להזין שם יחידה');
    } else if(!req.body.unit.userID) {
        return res.status(400).json('משתמש לא זוהה');
    } else if(!req.body.unit.businessId) {
        return res.status(400).json('עסק לא זוהה');
    }
    const unit = new Units(req.body.unit);
    unit.save((err, unit) => {
        if (err) {
            return res.status(400).json({err:err})
        }
        return res.json( unit);
    })

}

exports.deleteUnit = (req, res) => {
    Units.deleteOne({ _id: req.body.id }, (err) => {
        if (err) {
            return res.status(400).json({err});
        } else {
            return res.status(200).json({_id : req.body.id});
        }
    });
}