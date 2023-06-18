const express = require('express')
const router = express.Router()
const {
   getAuthUserData,
   setNewContactLabel,
   createContact
} = require('../controllers/contactsHandlerController')

router.get('/getAuthUserData',getAuthUserData)
router.post('/setNewContact',createContact)
router.post('/addLabel',setNewContactLabel)


module.exports = router;