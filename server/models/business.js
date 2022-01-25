const mongoose = require('mongoose');
const { ObjectId} = mongoose.Schema;

const businessSchema = mongoose.Schema({
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
    hasCategories: {
        type: Boolean,
        default: false
    },
    userID: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Business', businessSchema);