const mongoose = require('mongoose');
const { ObjectId} = mongoose.Schema;

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    startDate: {
        required: true,
        type: Date
    },
    endDate: {
        required: true,
        type: Date
    },
    unitId: {
        type : ObjectId,
        required: true,
        ref : 'Units'
    },
    businessId: {
        type : ObjectId,
        required: true,
        ref : 'Business'
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Event', eventSchema);