const express = require('express')
const router = express.Router()
const {
   getAuthUserData,
   setNewLabel,
   createContact
} = require('../controllers/contactsHandlerController')

router.get('/getAuthUserData',getAuthUserData)
router.post('/setNewContact',createContact)
router.post('/addLabel',setNewLabel)


module.exports = router;