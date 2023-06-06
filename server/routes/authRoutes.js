const {
   authorizeUser
   authSignOut
} = require('../controllers/authControllers')

const express = require('express')
const router = express.Router()

router.post('/authorizeUser',authorizeUser)
router.post('/signout',authSignOut)

module.exports = router;