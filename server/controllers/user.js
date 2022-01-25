const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { signupValidation, signinValidation } = require('../validation/user')
const expressJwt = require('express-jwt')

exports.signUp = async (req, res) => {

    // check validation

    const {error} = signupValidation(req.body)
    console.log(error)
    if (error){
        return res.status(400).json(error.details[0].message)
    }

    // check if email exists
    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) {
        return res.status(400).json('אימייל או סיסמה שגויים!');
    }

    const user = new User(req.body)

    user.save( (err, user) => {
        if (err) {
            return res.status(400).json({err:err})
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        res.cookie('bmt',token, {expire: new Date()+9999})
        const {_id, name, email, role} = user
        return res.json({token, user: {_id, name, email, role}})
    })
}


exports.signIn = (req, res) => {

    // check validation

    const {error} = signinValidation(req.body)
    if (error){
        return res.status(400).json(error.details[0].message)
    }

    User.findOne({email: req.body.email}, (err,user) => {
        if (err || !user){
            return res.status(400).json('אימייל או סיסמה שגויים!');
        }

        if (!user.authenticate(req.body.password)){
            return res.status(400).json('אימייל או סיסמה שגויים!')
        }

        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
        res.cookie("bmt",token,{expire: new Date()+9999})
        const {_id, name, email, role} = user
        return res.json({token, user: {_id, name, email, role}})
    })
}

exports.signOut = (req, res) => {
    res.clearCookie('bmt')
    return res.json('התנתקת בהצלחה!')
}

exports.loadUser = (req, res) => {
    const _id = req.auth._id;
    User.findById(_id, (err, user) => {
        if (err) {
            return res.status(200).json('user loaded successfully!');
        } else {
            const {_id, name, email, role} = user
            return res.json({_id, name, email, role})
        }
    })
}

exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth'
})

exports.userById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
        if (err || !user){
            return res.status(400).json({err:"User not found"})
        }
        req.profile = user;
        next()
    })
}

exports.isAuth = async (req,res,next) => {
    const user = req.profile && req.auth && req.profile._id == req.auth._id
    if (!user){
        return res.status(403).json({err:"Access denied!"})
    }
    next()
}