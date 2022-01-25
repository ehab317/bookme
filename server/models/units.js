const mongoose = require('mongoose');
const { ObjectId} = mongoose.Schema;

const unitsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true
    },
    description: {
        type: String,
        maxlength: 250
    },
    daily: {
        type: Boolean,
        default: false
    },
    businessId: {
        type : ObjectId,
        required: true,
        ref : 'Business'
    },
    userID: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Units', unitsSchema);