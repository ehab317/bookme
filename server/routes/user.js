const express = require('express')
const router = express.Router()

const { signUp, signIn, signOut, requireSignIn, loadUser } = require('../controllers/user')

router.post('/user/signup', signUp)
router.post('/user/signin', signIn)
router.post('/user/signout', signOut)
router.get('/user/auth', requireSignIn, loadUser)

module.exports = router