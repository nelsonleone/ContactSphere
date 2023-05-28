const {
   authSignIn,
   authSignUp,
   authSetUserCred,
   authSignOut
} = require('../controllers/authControllers')

const express = require('express')
const router = express.Router()

router.post('/signin',authSignIn)
router.post('/signup',authSignUp)
router.post('/signout',authSignOut)

module.exports = router;