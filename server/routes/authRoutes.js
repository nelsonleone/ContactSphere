const {
   authorizeUser,
   authSignOut,
   setCsrfToken,
   setAuthState
} = require('../controllers/authControllers')

const express = require('express')
const router = express.Router()

router.post('/authorizeUser',authorizeUser)
router.post('/signout',authSignOut)
router.get('/setCsrfToken',setCsrfToken)
router.get('/setAuthState',setAuthState)

module.exports = router;