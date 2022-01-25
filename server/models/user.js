const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 100
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 1
    }
},{timestamps: true})

userSchema.virtual('password').set(function(password){
    this._password=password;
    this.salt=uuidv4();
    this.hashed_password = this.encryptPassword(password)
}).get(function(){
    return this._password
})

userSchema.methods = {

    authenticate: function(planText){
        return this.encryptPassword(planText) === this.hashed_password
    },

    encryptPassword: function(password){
        if (!password) return '';
        try{
            return crypto.createHmac('sha1',this.salt).update(password).digest('hex')
        } catch (err){
            return err
        }
    }
}

module.exports = mongoose.model('User', userSchema)